function createEvent(org) {

    const selectCategoryList = document.getElementById('select-category')
    categoryAdapter.getAll().then(categories => {
        categories.forEach(category => {
            selectCategoryList.innerHTML += `<option value=${category.id}>${category.name}</option>`
        })
    })

    const eventForm = document.getElementById('create-event')
    eventForm.addEventListener('submit', function(e){
        e.preventDefault()
        const body = {
            "title": e.target.title.value,
            "location": e.target.location.value,
            "start": e.target.start.value,
            "end": e.target.end.value,
            "dress_code": e.target.dresscode.value,
            "speakers": e.target.speakers.value,
            "contact_email": e.target.email.value,
            "category_id": e.target.category.value,
            "tags": e.target.tags.value,
            "organisation_id": localStorage.getItem('user_id')
        }

        eventAdapter.post(body)
        .then(event => {
            displayEvent(event)
        })
        e.target.reset()
    })
}

function editOrDeleteEvent() {
    /** edit events */
    const eventList = document.getElementById('event-list')
    eventList.addEventListener('click', function(e){
        const eventId = e.target.dataset.id
        
        if (e.target.classList.contains('edit-event')) {
            
            const currentEventBox = e.target.parentElement.parentElement
            eventAdapter.get(eventId).then(event => {
                currentEventBox.innerHTML = `
                <form class="edit-event-info small-block">
                    <h3>Title: <input type="text" name="title" value="${event.title}"></h3>
                    <button type="submit" data-id="${event.id}" class="icon-btn"><i class="fa fa-check-square-o" aria-hidden="true"></i></button><br>
                    Location: 
                    <input type="text" name="location" value="${event.location}"><br>
                    Start date: 
                    <input type="datetime-local" name="start" value=${event.start.slice(0, -1)}><br>
                    End date: 
                    <input type="datetime-local" name="end" value=${event.end.slice(0, -1)}><br>
                    Dress Code: 
                    <input type="text" name="dresscode" value="${event.dress_code}"><br>
                    Speakers: 
                    <input type="text" name="speakers" value="${event.speakers}"><br>
                    Contact Email: 
                    <input type="email" name="contactemail" value="${event.contact_email}"><br>
                    Category: 
                    <select name="category" id="select-category"></select><br>
                    Tags: <input type="text" name="tags" value="${event.tags}"><br>
                </form>`
                
                /*** inputting options to category selection */
                const selectCategoryList = document.getElementById('select-category')
                categoryAdapter.getAll().then(categories => {
                    categories.forEach(category => {
                        if (event.category_id === category.id) {
                            selectCategoryList.innerHTML += `<option value=${category.id} selected>${category.name}</option>`
                        } else {
                            selectCategoryList.innerHTML += `<option value=${category.id}>${category.name}</option>`
                        }
                    })
                })


                const editEventForm = document.querySelector('.edit-event-info')
                editEventForm.addEventListener('submit', function(e){

                    e.preventDefault()
                    const body = {
                        "title": e.target.title.value,
                        "location": e.target.location.value,
                        "start": e.target.start.value,
                        "end": e.target.end.value,                            
                        "dress_code": e.target.dresscode.value,
                        "speakers": e.target.speakers.value,
                        "contact_email": e.target.contactemail.value,
                        "category_id": e.target.category.value,
                        "tags": e.target.tags.value
                    }
                    eventAdapter.patch(eventId, body)
                    .then(event => {
                        categoryAdapter.get(event.category_id)
                        .then(category => {
                            const categoryName = category.name
                            currentEventBox.innerHTML = `
                                <div class="event-title-container">
                                    <h3 class="inline">${event.title}</h3>
                                    <i class="fa fa-pencil-square-o edit-event" aria-hidden="true" data-id=${event.id}></i>
                                    <i class="fa fa-trash del-event" aria-hidden="true" data-id=${event.id}></i>
                                    <i class="fa fa-pie-chart" aria-hidden="true" id="chart-${event.id}"></i>
                                </div>
                                
                                <div class="event-info">
                                    <p>Location: ${event.location}</p>
                                    <p>Start date: ${displayDate(event.start)}</p>
                                    <p>End date: ${displayDate(event.end)}</p>              
                                    <p>Dress code: ${event.dress_code}</p>
                                    <p>Speakers: ${event.speakers}</p>
                                    <p>Contact: ${event.contact_email}</p>
                                    <p>Category: ${categoryName}</p>
                                    <p>Tags: ${event.tags}</p>
                                </div>
                                
                                <div id="chart-modal-${event.id}" class="modal">
                                    <div class="modal-content">
                                        <span id="close-${event.id}" class="close">&times;</span>
                                        <h2>Attendees for ${event.title}</h2>
                                        <h3>Major distribution</h3>
                                        <canvas id="major-chart-${event.id}" style="width:100; height: 100"></canvas>
                                        <h3>Year distribution</h3>
                                        <canvas id="year-chart-${event.id}" style="width:100; height: 100"></canvas>
                                    </div>
                                </div>`

                                fetch(`${EVENTS_URL}/${event.id}/students`)
                                .then(res => res.json())
                                .then(students => {
                                    /** major chart */
                                    let canvas = document.getElementById(`major-chart-${event.id}`)
                                    let freq = {}
                                    students.forEach(student => {
                                        if (freq[student.major] === undefined) {
                                            freq[student.major] = 1
                                        } else {
                                            freq[student.major] += 1
                                        }
                                    })
                        
                                    let ctx = canvas.getContext('2d')
                                    new Chart(ctx, {
                                        type: "pie",
                                        data: {
                                            datasets: [{
                                                data: Object.values(freq)
                                            }],
                                            labels: Object.keys(freq)
                                        },
                                        options: {
                                            plugins: {
                                                colorschemes: {
                                                    scheme: 'tableau.ClassicMedium10'
                                                }
                                            }
                                        }
                                    })
                        
                                /** year chart */
                                fetch(`${EVENTS_URL}/${event.id}/students`)
                                .then(res => res.json())
                                .then(students => {
                                    let yearCanvas = document.getElementById(`year-chart-${event.id}`)
                                    let freq = {}
                                    students.forEach(student => {
                                        if (freq[student.year] === undefined) {
                                            freq[student.year] = 1
                                        } else {
                                            freq[student.year] += 1
                                        }
                                    })
                        
                                    let ctx = yearCanvas.getContext('2d')
                                    new Chart(ctx, {
                                        type: "pie",
                                        data: {
                                            datasets: [{
                                                data: Object.values(freq)
                                            }],
                                            labels: Object.keys(freq)
                                        },
                                        options: {
                                            plugins: {
                                                colorschemes: {
                                                    scheme: 'tableau.ClassicMedium10'
                                                }
                                            }
                                        }
                                    })
                                })
                        
                                    /***** chart modal *****/
                                    let modal = document.getElementById(`chart-modal-${event.id}`);
                                    let btn = document.getElementById(`chart-${event.id}`);
                                    let span = document.getElementById(`close-${event.id}`);
                                    // console.log(span)
                        
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
                        
                                })
                        })
                    })
                })
            })
        } 

        /** delete events */
        else if (e.target.classList.contains('del-event')) {
            const orgId = localStorage.getItem('user_id')
            eventAdapter.delete(eventId)
            orgAdapter.get(orgId).then(org => { displayOrgHomePage(org) })
        }
    })
}