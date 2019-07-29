function displayAllTickets(student) {
    const myTickets = document.getElementById('my-tickets')
    myTickets.innerHTML = ''
    student.tickets.forEach(ticket => {
        displayTicket(ticket)
        // myTickets.innerHTML += `
        // <div class="my-event">
        //     <h3>${ticket.event.title}</h3>
        //     <p>${ticket.event.location} | ${ticket.event.start}</p>
        //     <button class="del-ticket" data-id=${ticket.id}>Cancel event</button>
        // </div>`
    })
}

function displayTicket(ticket) {
    const myTickets = document.getElementById('my-tickets')
    myTickets.innerHTML += `
        <div class="my-event">
            <h3>${ticket.event.title}</h3>
            <p>${ticket.event.location} | ${ticket.event.start}</p>
            <button class="del-ticket" data-id=${ticket.id}>Cancel event</button>
        </div>`
}


function removeTicket(studentId, calendar) {
    const myTickets = document.getElementById('my-tickets')
    const eventBlock = document.getElementById('events')

    myTickets.addEventListener('click', function(e){
        if (e.target.className === 'del-ticket') {
            const ticketId = e.target.dataset.id

            /** deleting event from calendar */
            fetch(`${TICKETS_URL}/${ticketId}`)
            .then(res => res.json())
            .then(ticket => {
                const eventId = ticket.event.id
                const event = calendar.getEventById(eventId)
                event.remove()
            })

            fetch(`${TICKETS_URL}/${ticketId}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(event => {
                e.target.parentElement.remove()
                eventBlock.innerHTML = ''
                displayAllEvents(studentId)
            })
        }
    })
}