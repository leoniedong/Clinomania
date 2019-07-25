function displayEvent(event){
    const eventList = document.getElementById('event-list')
    eventList.innerHTML += `
        <div class="event-box">
            <h3>${event.title}</h3>
            <button class="edit-event" data-id=${event.id}>Edit</button>
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
            <p>Date: ${event.date}</p>
            <p>Dress code: ${event.dress_code}</p>
            <p>Speakers: ${event.speakers}</p>
            <p>Contact: ${event.contact_email}</p>
            <p>Category: ${event.category}</p>
            <p>Tags: ${event.tags}</p>
        </div>
    </div>`
    
    // if (event.students.include)
}

