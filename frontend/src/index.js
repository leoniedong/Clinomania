/***** URLs *****/
const BASE_URL = "http://localhost:3000"
const STUDENTS_URL = `${BASE_URL}/students`
const ORGS_URL = `${BASE_URL}/organisations`
const EVENTS_URL = `${BASE_URL}/events`

/***** elements *****/
const mainContainer = document.querySelector('main')
let editStudent = false
let editOrg = false


/** document */
document.addEventListener('DOMContentLoaded', function(){
    console.log('Content loaded')
    console.log(localStorage)

    /** if a user is logged in */
    if(localStorage.getItem('user_id')){
        const userId = localStorage.getItem('user_id')
        const userType = localStorage.getItem('type')

        /** display student */
        if (userType === 'student'){
            fetch(`${STUDENTS_URL}/${userId}`)
            .then(res => res.json())
            .then(user => {
                displayStudentHomePage(user)
            })
        } 

        /** display oragnisation */
        else if (userType === 'organisation') {
            fetch(`${ORGS_URL}/${userId}`)
            .then(res => res.json())
            .then(user => {
                displayOrgHomePage(user)
            })
        } else {
            displayLogin()
        }
    } 
    /** if no user if found */
    else {
        displayLogin()
    }
})


/*** functions */

function capitalise(word) {
    return word[0].toUpperCase() + word.slice(1)
}

function displayLogin() {
    mainContainer.innerHTML = `
    <h1>Student login</h1>
    <form id="student-login">
        Email: <input type="email" name="email">
        <input type="submit">
    </form>

    <h1>Organisation login</h1>
    <form id="org-login">
        Email: <input type="email" name="email">
        <input type="submit">
    </form>

    <h1>New user? Create a new account</h1>
    <h2>Student</h2>
    <form id="signup-student">
        First name: 
        <input type="text" name="firstname"><br>
        Last name: 
        <input type="text" name="lastname"><br>
        Email: 
        <input type="email" name="email"><br>
        Year: 
        <select name="year">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select><br>
        Major:
        <input type="text" name="major"><br>
        <input type="submit" value="create student account">
    </form>

    <h2>Organisation</h2>
    <form id="signup-org">
        Name:
        <input type="text" name="name"><br>
        Email:
        <input type="email" name="email"><br>
        Description:
        <input type="text" name="description"><br>
        <input type="submit" value="create organisation account">
    </form>
    `

    /** student login */
    const studentLogin = document.getElementById('student-login')
    studentLogin.addEventListener('submit', function(e){
        e.preventDefault()
        const email = e.target[0].value
        fetch(`${BASE_URL}/students/login`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("user_id", data.id)
            if (data.id) {
                localStorage.setItem("type", "student")
                displayStudentHomePage(data)
            } else {
                displayLogin()
            }
        })
    })

    /** organisation login */
    const orgLogin = document.getElementById('org-login')
    orgLogin.addEventListener('submit', function(e){
        // console.log(e)
        e.preventDefault()
        const email = e.target[0].value
        // debugger
        fetch(`${BASE_URL}/orgs/login`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })
        .then(res => res.json())
        .then(data => {
            // debugger
            localStorage.setItem("user_id", data.id)
            if (data.id) {
                localStorage.setItem("type", "organisation")
                displayOrgHomePage(data)
            } else {
                displayLogin()
            }
        })
    })
    
    /** student signup */
    const signupStudent = document.getElementById('signup-student')
    signupStudent.addEventListener('submit', function(e){
        e.preventDefault()
        fetch(STUDENTS_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "first_name": e.target.firstname.value, 
                "last_name": e.target.lastname.value,
                "email": e.target.email.value, 
                "year": e.target.year.value, 
                "major": e.target.major.value
            })
        })
        .then(res => res.json())
        .then(student => {
            displayStudentHomePage(student)
        })
    })

    /** organisation signup */
    const signupOrg = document.getElementById('signup-org')
    signupOrg.addEventListener('submit', function(e){
        e.preventDefault()
        fetch(ORGS_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "name": e.target.name.value, 
                "email": e.target.email.value, 
                "description": e.target.description.value
            })
        })
        .then(res => res.json())
        .then(org => {
            console.log(org)
            displayOrgHomePage(org)
        })
    })
}


function displayStudentHomePage(student){
    let mainContainer = document.querySelector('main')
    mainContainer.innerHTML = `
    <h2>You are logged in as: ${capitalise(student.first_name)} ${capitalise(student.last_name)} (student)</h2>

    <button id="logout">Logout</button>

    <button id="del-student" data-id=${student.id}>Delete account</button>

    <button id="edit-student-btn">Edit profile</button>
    <div class="container" style="display:none">
        <form id="edit-student-form">
            First name: 
            <input type="text" name="firstname" value=${student.first_name}><br>
            Last name: 
            <input type="text" name="lastname" value=${student.last_name}><br>
            Email: 
            <input type="email" name="email" value=${student.email}><br>
            Year: 
            <select name="year" value=${student.year}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select><br>
            Major:
            <input type="text" name="major" value=${student.major}><br>
            <input type="submit" value="done" data-id=${student.id}>
        </form>
    </div>

    <h1>All events</h1>
    <div id="events"></div>`
    
    /** edit profile */
    const editStudentBtn = document.getElementById('edit-student-btn')
    editStudentBtn.addEventListener('click', function(e){
        let studentForm = document.querySelector('.container')
        editStudent = !editStudent
        if (editStudent) {
            studentForm.style.display = 'block'
            const editStudentForm = document.getElementById('edit-student-form')
            editStudentForm.addEventListener('submit', function(e){
                e.preventDefault()
                let studentId = e.target[5].dataset.id
                fetch(`${STUDENTS_URL}/${studentId}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "first_name": e.target.firstname.value, 
                        "last_name": e.target.lastname.value,
                        "email": e.target.email.value, 
                        "year": e.target.year.value, 
                        "major": e.target.major.value
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    displayStudentHomePage(data)
                })
            }) 
        } else {
            studentForm.style.display = 'none'
        }
    })
    
    /** delete student */
    const deleteStudentBtn = document.getElementById('del-student')
    deleteStudentBtn.addEventListener('click', function(e){
        e.preventDefault()
        let studentId = e.target.dataset.id
        fetch(`${STUDENTS_URL}/${studentId}`, {
            method: "DELETE"
        })
        .then(data => {
            displayLogin()
        })
    })
    

    /** logout */
    const logoutButton = document.getElementById('logout')
    logoutButton.addEventListener('click', function(e){
        localStorage.clear()
        displayLogin()
    })

    /** events index */
    fetch(EVENTS_URL)
    .then(res => res.json())
    .then(data => {
        const eventDiv = document.querySelector('div#events')
        eventDiv.innerHTML = `<p>Events will be displayed here</p>`
    })
}



function displayOrgHomePage(org){
    let mainContainer = document.querySelector('main')
    mainContainer.innerHTML = `<h2>You are logged in as: ${org.name} (organisation)</h2>
    
    <button id="logout">Logout</button>
    <button id="del-org" data-id=${org.id}>Delete account</button>

    <button id="edit-org-btn">Edit profile</button>
    <div class="container" style="display:none">
        <form id="edit-org-form">
            Name: 
            <input type="text" name="name" value=${org.name}><br>
            Email: 
            <input type="email" name="email" value=${org.email}><br>
            Description: 
            <input type="text" name="description" value=${org.description}>
            <input type="submit" value="done" data-id=${org.id}>
        </form>
    </div>`

    /** edit org profile */
    const editOrgBtn = document.getElementById('edit-org-btn')
    editOrgBtn.addEventListener('click', function(e){
        let orgForm = document.querySelector('.container')
        editOrg = !editOrg
        if (editOrg) {
            orgForm.style.display = 'block'
            const editOrgForm = document.getElementById('edit-org-form')
            editOrgForm.addEventListener('submit', function(e){
                e.preventDefault()
                let orgId = e.target[5].dataset.id
                fetch(`${ORGS_URL}/${orgId}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "name": e.target.name.value, 
                        "email": e.target.email.value, 
                        "description": e.target.description.value
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    displayOrgHomePage(data)
                })
            }) 
        } else {
            orgForm.style.display = 'none'
        }
    })

    /** delete organsation */
    const deleteOrgBtn = document.getElementById('del-org')
    deleteOrgBtn.addEventListener('click', function(e){
        e.preventDefault()
        let orgId = e.target.dataset.id
        fetch(`${ORGS_URL}/${orgId}`, {
            method: "DELETE"
        })
        .then(data => {
            displayLogin()
        })
    })

    /** logout */
    const logoutButton = document.getElementById('logout')
    logoutButton.addEventListener('click', function(e){
        localStorage.clear()
        displayLogin()
    })

    /** all my events */
    fetch(`$`)


    /** create events */
}