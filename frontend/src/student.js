let calendar;

function displayStudentHomePage(student){    
    const mainContainer = document.querySelector('main')

    /***** navbar (search, user menu), two-column layour content */
    mainContainer.innerHTML = `
    <div class="nav student">
        <h2>Clinomania</h2>

        <div class="user-menu" id="user-menu">
            <h2>${capitalise(student.first_name)} ${capitalise(student.last_name)} (student)</h2>
            <div id="user-option" class="user-option">
                <h2 id="profile"><i class="fa fa-user-circle-o" id="view-profile" aria-hidden="true"></i></h2>
                <div id="profile-modal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2>Welcome, ${capitalise(student.first_name)} ${capitalise(student.last_name)}</h2>
                        EMAIL: ${student.email}<br>
                        YEAR: ${student.year}<br>
                        MAJOR: ${student.major}<br>
                        <button id="edit-student-button" class="btn" data-id=${student.id}>Edit profile</button>
                        <button id="del-student" class="btn">Delete account</button>


                        <div id="edit-student-container" style="display:none">
                            <form id="edit-student-form">
                            <div class="block">
                                First name: <input type="text" name="firstname" value="${student.first_name}"><br>
                                Last name: <input type="text" name="lastname" value="${student.last_name}"><br>
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
                                <input type="text" name="major" value="${student.major}">
                                <button type="submit" data-id=${student.id} style="border: 0px"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
                            </div>
                            </form>
                        </div>

                    </div>

                </div>

                <h2 id="logout"><i class="fa fa-sign-out" id="logout" aria-hidden="true"></i></h2>
            </div>
        </div>

    </div>

    <div class="main">
    
        <div class="first-column">
            <h1>Browse all events</h1>

            <div class="inline">
                <button id="show-all" class="btn" style="display: inline-block">Show all</button>
                <div id="search-container" style="display: inline-block">
                    <form id="search-bar" style="display: inline-flex">
                        <input class="searchTerm" type="text" placeholder="Search..." name="search">
                        <button type="submit" class="searchButton"><i class="fa fa-search"></i></button>
                    </form>
                </div>

                <form id="filter-bar" style="display: inline-block">
                    <select class="filter" id="filter-category" style="display: inline-block;">Category
                        <option disabled selected>-- Filter by category --</option>
                    </select>
                    <button type="submit" style="display: inline-block;" class="icon-btn"><i class="fa fa-filter" aria-hidden="true"></i></button>
                </form>
            </div>

            <div id="events"></div>
            
        </div>

        <div class="second-column">
            <h1>My calendar</h1>
            <div id='calendar'></div>

            <h1>My tickets</h1>
            <div id="my-tickets"></div>
        </div>

    </div>
    `

    /***** profile modal *****/
    // profileModal()
    let modal = document.getElementById("profile-modal");
    let btn = document.getElementById("profile");
    let span = document.getElementsByClassName("close")[0];

    /** open modal */
    btn.onclick = function() {
        modal.style.display = "block";
    }

    /** close modal by clicking x */
    span.onclick = function() {
        modal.style.display = "none";
    }

    /** close modal by clicking window */
    modal.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    /*** navbar scrolling function that doesn't seem to work */
    // window.scroll(function() {
    //     if ($(window).scrollTop() > 10) {
    //         $('#navBar').addClass('floatingNav');
    //     } else {
    //         $('#navBar').removeClass('floatingNav');
    //     }
    // });


    /***** filter and search bar *****/
    filterCategory(student.id)

    /** search */
    document.getElementById('search-bar').addEventListener('submit', (e) => {
        e.preventDefault()
        const searchWordArr = e.target[0].value.toLowerCase().trim().match(/\w+/g)
        // console.log(searchWordArr)
        eventAdapter.getAll().then(events => {
            let results = []
            for (let i=0; i < searchWordArr.length; i++) {
                let searchWord = searchWordArr[i]
                events.forEach(event => {
                    if (Object.values(event).join().toLowerCase().includes(searchWord) && !results.includes(event)) {
                        results.push(event)
                    }
                })
            }
            const eventDiv = document.querySelector('div#events')
            eventDiv.innerHTML = ''
            results.forEach(event => {
                showEvent(event, student.id)
            })
        })
    })

    /** clear search */
    document.addEventListener('click', (e) => {
        // console.log(e)
        if (e.target.id === 'show-all') {
            displayAllEvents(student.id)
        }
    })


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
    editStudentProfile(student)
    deleteStudent()
    logout()
    
    
    /** display all events */
    let studentId = student.id
    displayAllEvents(studentId)

    /** tickets */
    createTicket(student)
    displayAllTickets(student)
    removeTicket(student.id, calendar)
}

/** CRUD functions for students */
function editStudentProfile(student) {
    let editStudent = false
    document.getElementById('select-year').value = `${student.year}`
    const editStudentBtn = document.getElementById('edit-student-button')
    editStudentBtn.addEventListener('click', function(e){
        let studentForm = document.getElementById('edit-student-container')
        editStudent = !editStudent
        if (editStudent) {
            studentForm.style.display = 'block'
            const editStudentForm = document.getElementById('edit-student-form')
            editStudentForm.addEventListener('submit', function(e){
                e.preventDefault()
                let studentId = e.target[5].dataset.id
                let body = {
                    "first_name": e.target.firstname.value, 
                    "last_name": e.target.lastname.value,
                    "email": e.target.email.value, 
                    "year": e.target.year.value, 
                    "major": e.target.major.value
                }
                studentAdapter.patch(studentId, body)
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
        studentAdapter.delete(studentId)
        .then(() => {
            displayLogin()
            localStorage.clear()
        })
    })
}

