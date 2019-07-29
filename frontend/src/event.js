function displayAllEvents(studentId) {

    fetch(EVENTS_URL)
    .then(res => res.json())
    .then(events => {
        events.forEach(event => {
            /** show + if not signed up */
            if (!event.students.map(student => student.id).includes(studentId)){
                const eventDiv = document.querySelector('div#events')
                eventDiv.innerHTML += `
                <div class="event-box">
                    <div class="event-title-container">
                        <h3 style="display:inline-block;">${event.title}</h3>
                        <i class="fa fa-calendar-plus-o sign-up-event" data-id=${event.id} aria-hidden="true" display="color:#DDE9F4"></i>
                    </div>
                    
                    <div class="event-info">
                        <p>Location: ${event.location}</p>
                        <p>Start date: ${displayDate(event.start)}</p>
                        <p>End date: ${displayDate(event.end)}</p>
                        <p>Dress code: ${event.dress_code}</p>
                        <p>Speakers: ${event.speakers}</p>
                        <p>Contact: ${event.contact_email}</p>
                        <p>Category: ${event.category}</p>
                        <p>Tags: ${event.tags}</p>
                    </div>
                </div>`
            } 
            /** no + if signed up */
            else {
                const eventDiv = document.querySelector('div#events')
                eventDiv.innerHTML += `
                <div class="event-box">
                    <h3>${event.title}</h3>
                    <div class="event-info">
                        <p>Location: ${event.location}</p>
                        <p>Start date: ${displayDate(event.start)}</p>
                        <p>End date: ${displayDate(event.end)}</p>
                        <p>Dress code: ${event.dress_code}</p>
                        <p>Speakers: ${event.speakers}</p>
                        <p>Contact: ${event.contact_email}</p>
                        <p>Category: ${event.category}</p>
                        <p>Tags: ${event.tags}</p>
                    </div>
                </div>`
            }
        })
    })
}


function displayEvent(event){
    const eventList = document.getElementById('event-list')
    eventList.innerHTML += `
        <div class="event-box">
            <h3>${event.title}</h3>
            <button class="edit-event" data-id=${event.id}>Edit</button>
            <button class="del-event" data-id=${event.id}>Delete</button>
            <div class="event-info">
                <p>Location: ${event.location}</p>
                <p>Start date: ${displayDate(event.start)}</p>
                <p>End date: ${displayDate(event.end)}</p>              
                <p>Dress code: ${event.dress_code}</p>
                <p>Speakers: ${event.speakers}</p>
                <p>Contact: ${event.contact_email}</p>
                <p>Category: ${event.category}</p>
                <p>Tags: ${event.tags}</p>
            </div>
        </div>`
}

function showEvent(event){
    const eventDiv = document.querySelector('div#events')
    eventDiv.innerHTML += `
    <div class="event-box">
        <h3>${event.title}</h3>
        <button class="sign-up-event" data-id=${event.id}>Sign up</button>
        <div class="event-info">
            <p>Location: ${event.location}</p>
            <p>Start date: ${displayDate(event.start)}</p>
            <p>End date: ${displayDate(event.end)}</p>
            <p>Dress code: ${event.dress_code}</p>
            <p>Speakers: ${event.speakers}</p>
            <p>Contact: ${event.contact_email}</p>
            <p>Category: ${event.category}</p>
            <p>Tags: ${event.tags}</p>
        </div>
    </div>`
}

