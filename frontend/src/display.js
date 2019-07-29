function displayAllEvents(studentId) {
    fetch(EVENTS_URL)
    .then(res => res.json())
    .then(events => {
        events.forEach(event => {
            showEvent(event)
            /** show + if not signed up */
            if (!event.students.map(student => student.id).includes(studentId)){
                const etc = document.getElementById(`etc-${event.id}`)
                etc.innerHTML += `<i class="fa fa-calendar-plus-o sign-up-event" data-id=${event.id} aria-hidden="true"></i>`
            } 
        })
    })
}

/** displaying events for students */
function showEvent(event){
    const eventDiv = document.querySelector('div#events')
    eventDiv.innerHTML += `
    <div class="event-box">
        <div class="event-title-container" id="etc-${event.id}">
            <h3>${event.title}</h3>
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

/** displaying events for organisations */
function displayEvent(event){
    const eventList = document.getElementById('event-list')
    eventList.innerHTML += `
        <div class="event-box">
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
                <p>Category: ${event.category}</p>
                <p>Tags: ${event.tags}</p>
            </div>
        </div>`
}



