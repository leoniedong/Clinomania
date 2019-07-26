

function removeTicket() {
    const myTickets = document.getElementById('my-tickets')
    const eventBlock = document.getElementById('events')

    myTickets.addEventListener('click', function(e){
        if (e.target.className === 'del-ticket') {
            const ticketId = e.target.dataset.id
            // calendar.remove('')
            fetch(`${TICKETS_URL}/${ticketId}`, {
                method: "DELETE",
            })
            .then(event => {
                e.target.parentElement.remove()
                eventBlock.innerHTML = ''
                displayAllEvents()
            })
        }
    })
}