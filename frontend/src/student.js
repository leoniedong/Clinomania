function displayStudentHomePage(student){
    let editStudent = false


    let mainContainer = document.querySelector('main')
    mainContainer.innerHTML = `
    <h2>You are logged in as: ${capitalise(student.first_name)} ${capitalise(student.last_name)} (student)</h2>

    <button id="logout">Logout</button>

    <button id="del-student" data-id=${student.id}>Delete account</button>

    <button id="edit-student-btn">Edit profile</button>
    <div class="container" style="display:none">
        <form id="edit-student-form">
            First name: 
            <input type="text" name="firstname" value="${student.first_name}"><br>
            Last name: 
            <input type="text" name="lastname" value="${student.last_name}"><br>
            Email: 
            <input type="email" name="email" value="${student.email}"><br>
            Year: 
            <select name="year" id="select-year">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select><br>
            Major:
            <input type="text" name="major" value="${student.major}"><br>
            <input type="submit" value="done" data-id=${student.id}>
        </form>
    </div>

    <h1>My tickets</h1>
    <div id="my-tickets"></div>

    <h1>All events</h1>
    <div id="events"></div>
    
    <h3>Expired events</h3>
    <p>Presumably all expired events will be displayed here.</p>
    `
    /** edit student form year */
    document.getElementById('select-year').value = `${student.year}`
    
    const myTickets = document.getElementById('my-tickets')
    
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
                .then(student => {
                    // console.log('edited student')
                    console.log(student)
                    displayStudentHomePage(student)
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
        .then(() => {
            displayLogin()
            localStorage.clear()
        })
    })
    

    /** logout */
    const logoutButton = document.getElementById('logout')
    logoutButton.addEventListener('click', function(e){
        localStorage.clear()
        displayLogin()
    })

    /** display all events */
    fetch(EVENTS_URL)
    .then(res => res.json())
    .then(events => {
        events.forEach(event => {
            const eventDiv = document.querySelector('div#events')
            eventDiv.innerHTML += `
            <div class="event-box">
                <h3>${event.title}</h3>
                <button class="sign-up-event" data-id=${event.id}>Sign up</button>
                <div class="event-info">
                    <p>Location: ${event.location}</p>
                    <p>Date: ${event.date}</p>
                    <p>Dress code: ${event.dress_code}</p>
                    <p>Speakers: ${event.speakers}</p>
                    <p>Contact: ${event.contact_email}</p>
                    <p>Category: ${event.category}</p>
                    <p>Tags: ${event.tags}</p>
                </div>
            </div>`
        })
    })

    /** sign up for events => creating a ticket */
    const eventBlock = document.getElementById('events')
    eventBlock.addEventListener('click', function(e){
        if (e.target.className === 'sign-up-event'){
            const eventId = e.target.dataset.id
            const studentId = localStorage.getItem('user_id')

            /** creating a ticket once clicked sign up button */
            fetch(TICKETS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    student_id: studentId,
                    event_id: eventId
                })
            })
            .then(res => res.json())
            .then(ticket => {
                console.log(ticket.event.title)
                console.log(myTickets)
                myTickets.innerHTML += `
                <div class="my-event">
                    <h3>${ticket.event.title}</h3>
                    <button class="del-ticket" data-id=${ticket.id}>Remove</button>
                    <p>${ticket.event.location}</p>
                    <p>${ticket.event.date}</p>
                </div>`  
            })
        }
    })

    /** display student's events */
    displayAllTickets()

    function displayAllTickets() {
        myTickets.innerHTML = ''
        // debugger
        student.tickets.forEach(ticket => {
            myTickets.innerHTML += `
            <div class="my-event">
                <h3>${ticket.event.title}</h3>
                <button class="del-ticket" data-id=${ticket.id}>Remove</button>
                <p>Location: ${ticket.event.location}</p>
                <p>Date: ${ticket.event.date}</p>
            </div>`
        })
    }
    
    /** remove ticket */
    myTickets.addEventListener('click', function(e){
        // debugger
        if (e.target.className === 'del-ticket') {
            const ticketId = e.target.dataset.id
            fetch(`${TICKETS_URL}/${ticketId}`, {
                method: "DELETE",
            })
            .then(function(){
                e.target.parentElement.remove()
            })
        }
    })
}