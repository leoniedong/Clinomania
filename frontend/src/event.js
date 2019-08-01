function createEvent(org) {
    mainContainer.innerHTML += `
    <h1>Create new event</h1>
    <form id="create-event">
        Title: <input type="text" name="title" required><br>
        Location: <input id="text" name="location" required><br>
        Start date: <input type="datetime-local" name="start" required><br>
        End date: <input type="datetime-local" name="end" required><br>
        Dress Code: <input type="text" name="dresscode"><br>
        Speakers: <input type="text" name="speakers"><br>
        Contact Email: <input type="email" name="email"><br>
        Category:
        <select name="category" id="select-category">
        </select><br>
        Tags: <input type="text" name="tags"><br>
        <input type="submit" value="Create new event" data-id=${org.id}>
    </form>`

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
                <form class="edit-event-info">
                    <h3>Title: <input type="text" name="title" value="${event.title}"></h3>
                    <input type="submit" value="done" data-id="${event.id}"><br>
                    Location: 
                    <input id="text" name="location" value="${event.location}"><br>
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
                                </div>`
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