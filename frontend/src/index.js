/***** URLs *****/
const BASE_URL = "http://localhost:3000"
const STUDENTS_URL = `${BASE_URL}/students`
const ORGS_URL = `${BASE_URL}/organisations`
const EVENTS_URL = `${BASE_URL}/events`
const TICKETS_URL = `${BASE_URL}/tickets`
const mainContainer = document.querySelector('main')

/** document */
document.addEventListener('DOMContentLoaded', function(){
    /***** constants *****/
    const myTickets = document.getElementById('my-tickets')
    


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
            console.log('user is logged in')
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
            if (data.error) {
                alert('Log in unsuccessful')
            } else {
                localStorage.setItem("user_id", data.id)
                if (data.id) {
                    localStorage.setItem("type", "student")
                    displayStudentHomePage(data)
                } else {
                    displayLogin()
                }
            }
        })
    })

    /** organisation login */
    const orgLogin = document.getElementById('org-login')
    orgLogin.addEventListener('submit', function(e){
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
            if (data.error) {
                alert('Log in unsuccessful')
            } else {
                localStorage.setItem("user_id", data.id)
                if (data.id) {
                    localStorage.setItem("type", "organisation")
                    displayOrgHomePage(data)
                } else {
                    displayLogin()
                }
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
            displayOrgHomePage(org)
        })
    })
}