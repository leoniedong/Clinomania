let calendar;

function displayStudentHomePage(student){    
    let mainContainer = document.querySelector('main')

    mainContainer.innerHTML = `
    
    <div class="nav student">
        <h2>Home page that does nothing rn</h2>
        <input type="text" placeholder="Search...">
        <div class="dropdown">
            <button class="dropbtn" onclick="clickMenu()">
            <h2>${capitalise(student.first_name)} ${capitalise(student.last_name)} (student)</h2> 
            <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <p id="profile">View profile</p><br>
                <p id="logout">Logout</p><br>

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
                    <button id="del-student" data-id=${student.id}>Delete account</button>
                </div>
            </div>
        </div>

    

    </div>


    <div id='calendar'></div>

    <h1>My tickets</h1>
    <div id="my-tickets"></div>

    <h1>All events</h1>
    <div id="events"></div>
    
    <h3>Expired events</h3>
    <p>Presumably all expired events will be displayed here.</p>
    `


    

    /** calendar */
    // showCalendar(student)
    const studentEvents = student.tickets.map(ticket => ticket.event)
    const calEl = mainContainer.querySelector('div#calendar')
    calendar = new FullCalendar.Calendar(calEl, {
        timeFormat: 'HH:mm',
        timeZone: 'UTC',
        plugins: ['dayGrid'],
        events: studentEvents
    })

    calendar.render()

    /** All student functionalities */
    /** edit profile */
    editStudentProfile(student)
    
    /** delete student */
    deleteStudent()

    /** logout */
    logout()
    
    
    /** display all events */
    let studentId = student.id
    displayAllEvents(studentId)

    

    
    /** all the ticket functionalities */
    const myTickets = document.getElementById('my-tickets')

    /** sign up for events => creating a ticket */
    const eventBlock = document.getElementById('events')
    eventBlock.addEventListener('click', function(e){
        if (e.target.classList.contains('sign-up-event')){
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
                console.log(`added event: ` + `${ticket.event.title}`)
                displayTicket(ticket)
                // myTickets.innerHTML += `
                // <div class="my-event">
                //     <h3>${ticket.event.title}</h3>
                //     <button class="del-ticket" data-id=${ticket.id}>Remove</button>
                //     <p>${ticket.event.location}</p>
                //     <p>${ticket.event.date}</p>
                // </div>`
                let eventDiv = document.querySelector('div#events')
                eventDiv.innerHTML = ''
                displayAllEvents(student.id)
                calendar.addEvent(ticket.event)
            })
        }
    })

    /** display student's events */
    displayAllTickets(student)
    
    /** remove ticket */
    removeTicket(student.id, calendar)
    
}

/** CRUD functions for students */
function editStudentProfile(student) {
    let editStudent = false
    document.getElementById('select-year').value = `${student.year}`
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
                    console.log('edited student')
                    displayStudentHomePage(student)
                })
            }) 
        } else {
            studentForm.style.display = 'none'
        }
    })
}

function deleteStudent() {
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
}

function clickMenu() {
    document.getElementById("dropdown-content").classList.toggle("show")
}
