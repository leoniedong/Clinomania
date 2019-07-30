let calendar;

function displayStudentHomePage(student){    
    let mainContainer = document.querySelector('main')

    mainContainer.innerHTML = `
    <div class="nav student">
        <h2>Home page?</h2>
        <input type="text" placeholder="Search..." name="search">
        <button type="submit"><i class="fa fa-search"></i></button>
        <button id="filter">Filter</button>
        <div id="filter-container" style="display:none">
            <form id="filter-bar">
                <select id="filter-category">Category
                    <option disabled selected>-- By category --</option>
                </select>
                <select id="filter-day">Day
                    <option disabled selected>-- By day --</option>
                </select>
                <input type="submit" value="apply">
            </form>
        </div>


        <div class="dropdown">
            <button class="dropbtn" onclick="clickMenu()">
            <div class="user-wrapper">
                <h2>${capitalise(student.first_name)} ${capitalise(student.last_name)} (student)</h2> 
                <i class="fa fa-caret-down"></i>
            </div>
            </button>

            <div id="dropdown-content" class="dropdown-content">
                <p id="profile">View profile</p><br>
                <p id="logout">Logout</p><br>

                <p id="edit-student-btn">Edit profile</p>
                <div class="edit-student-container" style="display:none">
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

    <div class="main">
        <div id='calendar'></div>

        <h1>My tickets</h1>
        <div id="my-tickets"></div>

        <h1>Browse all events</h1>
        <div id="events"></div>
        
        <h3>Expired events</h3>
        <p>Presumably all expired events will be displayed here.</p>
    </div>
    `

    const filterCategoryList = document.getElementById('filter-category')
    categoryAdapter.getAll().then(categories => {
        categories.forEach(category => {
            filterCategoryList.innerHTML += `<option value=${category.id}>${category.name}</option>`
        })
    })

    let filterDisplay = false
    document.getElementById('filter').addEventListener('click', (e) => {
        filterDisplay = !filterDisplay
        const filterContainer = document.getElementById('filter-container')
        if (filterDisplay) {
            filterContainer.style.display = 'block'
            const filterBar = document.getElementById('filter-bar')
            filterBar.addEventListener('submit', (e) => {
                e.preventDefault()
                const selectedCategoryId = e.target[0].value
                categoryAdapter.get(selectedCategoryId).then(cat => {
                    console.log(cat)
                    const eventDiv = document.querySelector('div#events')
                    eventDiv.innerHTML = ''
                    cat.events.forEach(event => {
                        debugger
                        showEvent(event, student.id)
                    })
                })
            })
        } else {
            filterContainer.style.display = 'none'
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
    const editStudentBtn = document.getElementById('edit-student-btn')
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

function clickMenu() {
    document.getElementById("dropdown-content").classList.toggle("show")
}

// window.onclick = function(e) {
//     if (!e.target.matches('.dropbtn')) {
//     let myDropdown = document.getElementById("dropdown-content");
//     if (myDropdown.classList.contains('show')) {
//         myDropdown.classList.remove('show');
//         }
//     }
// }

window.scroll(function() {
    if ($(window).scrollTop() > 10) {
        $('#navBar').addClass('floatingNav');
    } else {
        $('#navBar').removeClass('floatingNav');
    }
});