function displayOrgHomePage(org){

    /*** constants */
    const mainContainer = document.querySelector('main')



    /** other */
    let editOrg = false



    mainContainer.innerHTML = `
    <h2>You are logged in as: ${capitalise(org.name)} (organisation)</h2>
    
    <button id="logout">Logout</button>

    <button id="del-org" data-id=${org.id}>Delete account</button>

    <button id="edit-org-btn">Edit profile</button>
    <div class="container" style="display:none">
        <form id="edit-org-form">
            Name: 
            <input type="text" name="name" value="${org.name}"><br>
            Email: 
            <input type="email" name="email" value="${org.email}"><br>
            Description: 
            <input type="text" name="description" value="${org.description}">
            <input type="submit" value="done" data-id=${org.id}>
        </form>
    </div>`

    /** edit org profile */
    document.addEventListener('click', function(e){
        // console.log(e)
        if (e.target.id === 'edit-org-btn') {
            let orgForm = document.querySelector('.container')
            console.log(orgForm)
            editOrg = !editOrg
            console.log(editOrg)
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
        } 
        /** delete organisation */
        else if (e.target.id === 'del-org') {
            let orgId = e.target.dataset.id
            fetch(`${ORGS_URL}/${orgId}`, {
                method: "DELETE"
            })
            .then(() => {
                displayLogin(),
                localStorage.clear()
            })
        }
    })

    logout()

    /** all events */
    mainContainer.innerHTML += `
    <h1>Events</h1><div id="event-list"></div>`
    fetch(`${ORGS_URL}/${org.id}`)
    .then(res => res.json())
    .then(org => {
        org.events.forEach(event => {
            displayEvent(event)
        })
    })

    /** create events */
    mainContainer.innerHTML += `
    <h1>Create new event</h1>
    <form id="create-event">
        Title: <input type="text" name="title" required><br>
        Location: <input id="text" name="location" required><br>
        Date: <input type="datetime-local" name="date" required><br>
        Dress Code: <input type="text" name="dresscode"><br>
        Speakers: <input type="text" name="speakers"><br>
        Contact Email: <input type="email" name="email"><br>
        Category: <input type="text" name="category"><br>
        Tags: <input type="text" name="tags"><br>
        <input type="submit" value="Create new event" data-id=${org.id}>
    </form>`

    const eventForm = document.getElementById('create-event')
    eventForm.addEventListener('submit', function(e){
        e.preventDefault()
        const body = JSON.stringify({
            "title": e.target.title.value,
            "location": e.target.location.value,
            "date": e.target.date.value,
            "dress_code": e.target.dresscode.value,
            "speakers": e.target.speakers.value,
            "contact_email": e.target.email.value,
            "category": e.target.category.value,
            "tags": e.target.tags.value,
            "organisation_id": localStorage.getItem('user_id')
        })
        fetch(EVENTS_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: body
        })
        .then(res => res.json())
        .then(event => {
            displayEvent(event)
        })
        e.target.reset()
    })

    /** edit events */
    const eventList = document.getElementById('event-list')
    eventList.addEventListener('click', function(e){
        const eventId = e.target.dataset.id
        
        if (e.target.className === 'edit-event') {
            const currentEventBox = e.target.parentElement
            fetch(`${EVENTS_URL}/${eventId}`)
            .then(res => res.json())
            .then(event => {
                let eventBox = e.target.parentElement
                eventBox.innerHTML = `
                <form class="edit-event-info">
                    <h3>Title: <input type="text" name="title" value="${event.title}"></h3>
                    <input type="submit" value="done" data-id="${event.id}"><br>
                    Location: <input id="text" name="location" value="${event.location}"><br>
                    Date: <input type="datetime-local" name="date" value=${event.date.slice(0, -1)}><br>
                    Dress Code: <input type="text" name="dresscode" value="${event.dress_code}"><br>
                    Speakers: <input type="text" name="speakers" value="${event.speakers}"><br>
                    Contact Email: <input type="email" name="contactemail" value="${event.contact_email}"><br>
                    Category: <input type="text" name="category" value="${event.category}"><br>
                    Tags: <input type="text" name="tags" value="${event.tags}"><br>
                </form>
                `
                const editEventForm = document.querySelector('.edit-event-info')
                editEventForm.addEventListener('submit', function(e){
                    e.preventDefault()
                    fetch(`${EVENTS_URL}/${eventId}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            "title": e.target.title.value,
                            "location": e.target.location.value,
                            "date": e.target.date.value,
                            "dress_code": e.target.dresscode.value,
                            "speakers": e.target.speakers.value,
                            "contact_email": e.target.contactemail.value,
                            "category": e.target.category.value,
                            "tags": e.target.tags.value
                        })
                    })
                    .then(res => res.json())
                    .then(event => {
                        currentEventBox.innerHTML = `
                        <div class="event-box">
                            <h3>${event.title}</h3>
                            <button class="edit-event" data-id=${event.id}}>Edit</button>
                            <button class="del-event" data-id=${event.id}>Delete</button>
                            <div class="event-info">
                                <p>Location: ${event.location}</p>
                                <p>Date: ${event.date}</p>
                                <p>Dress code: ${event.dress_code}</p>
                                <p>Speakers: ${event.speakers}</p>
                                <p>Contact: ${event.contact_email}</p>
                                <p>Category: ${event.category}</p>
                                <p>Tags: ${event.tags}</p>
                            </div>
                        </div>
                        `
                    })
                })
            })
        } 
        /** delete events */
        else if (e.target.className === 'del-event') {
            const orgId = localStorage.getItem('user_id')
            fetch(`${EVENTS_URL}/${eventId}`, {
                method: "DELETE"
            })
            fetch(`${ORGS_URL}/${orgId}`)
            .then(res => res.json())
            .then(org => {
                displayOrgHomePage(org)
            })
        }
    })
}