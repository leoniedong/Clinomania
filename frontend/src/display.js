function displayAllEvents(studentId) {
    eventAdapter.getAll().then(events => {
        events.forEach(event => {
            showEvent(event, studentId)
        })
    })
    
}

/** displaying events for students */
function showEvent(event, studentId){
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
                <p>Category: ${event.category_name}</p>
                <p>Tags: ${event.tags}</p>
                <p>Notes: ${event.notes}</p>
            </div>
        </div>`
    
    /** show + if not signed up */
    eventAdapter.get(event.id).then(event => {
        if (!event.students.map(student => student.id).includes(studentId)){
            const etc = document.getElementById(`etc-${event.id}`)
            etc.innerHTML += `<i class="fa fa-calendar-plus-o sign-up-event" data-id=${event.id} aria-hidden="true"></i>`
        } 
    })

}


/** displaying organisation's events */
function allOrgEvents(orgId) {
    mainContainer.innerHTML += `
    <h1>All My Events</h1><div id="event-list"></div>`
    orgAdapter.get(orgId)
    .then(org => {
        org.events.forEach(event => {
            displayEvent(event)
        })
    })
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
                <i class="fa fa-pie-chart" aria-hidden="true" id="chart-${event.id}"></i>
            </div>

            <div class="event-info">
                <p>Location: ${event.location}</p>
                <p>Start date: ${displayDate(event.start)}</p>
                <p>End date: ${displayDate(event.end)}</p>
                <p>Dress code: ${event.dress_code}</p>
                <p>Speakers: ${event.speakers}</p>
                <p>Contact: ${event.contact_email}</p>
                <p>Category: ${event.category_name}</p>
                <p>Tags: ${event.tags}</p>
                <p>Notes: ${event.notes}</p>
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
            </div>
        </div>`

        fetch(`${EVENTS_URL}/1/students`)
        .then(res => res.json())
        .then(students => {
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

            let yearCanvas = document.getElementById(`year-chart-${event.id}`)
            fetch(`${EVENTS_URL}/${event.id}/students`)
            .then(res => res.json())
            .then(students => {
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
            console.log(span)

            /** open modal */
            btn.onclick = function() {
                modal.style.display = "block";
            }

            /** close modal by clicking x */
            span.onclick = function() {
                modal.style.display = "none";
            }

            /** close modal by clicking window */
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

        })

        


}



/*** this is not done */
function eventInfoContent(element, event) {
    element.innerHTML += 
    `<div class="event-info">
        <p>Location: ${event.location}</p>
        <p>Start date: ${displayDate(event.start)}</p>
        <p>End date: ${displayDate(event.end)}</p>
        <p>Dress code: ${event.dress_code}</p>
        <p>Speakers: ${event.speakers}</p>
        <p>Contact: ${event.contact_email}</p>
        <p>Category: ${event.category_name}</p>
        <p>Tags: ${event.tags}</p>
        <p>Notes: ${event.notes}</p>
    </div>`
}