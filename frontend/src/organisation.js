function displayOrgHomePage(org){

    let editOrg = false
    displayOrgMainContent(org)
    

    /** edit org profile */
    document.addEventListener('click', function(e){
        if (e.target.id === 'edit-org-btn') {
            let orgForm = document.getElementById('edit-org-container')
            editOrg = !editOrg
            if (editOrg) {
                orgForm.style.display = 'block'
                const editOrgForm = document.getElementById('edit-org-form')
                editOrgForm.addEventListener('submit', function(e){
                    e.preventDefault()
                    let orgId = e.target[3].dataset.id
                    let body = {
                        "name": e.target.name.value, 
                        "email": e.target.email.value, 
                        "description": e.target.description.value
                    }
                    orgAdapter.patch(orgId, body)
                    .then(data => {
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
            console.log(orgId)
            orgAdapter.delete(orgId)
            .then(() => {
                displayLogin(),
                localStorage.clear()
            })
        }
    })

    logout()    

    /** CRUD for events */
    let orgId = localStorage.getItem('user_id')

    allOrgEvents(orgId)
    createEvent(org)
    editOrDeleteEvent()
    
}

function displayOrgMainContent(org) {
    const mainContainer = document.querySelector('main')
    mainContainer.innerHTML = `
    <div class="nav org">
        <h2>Clinomania <i class="fa fa-superpowers" aria-hidden="true"></i>
        </h2>

        <div class="user-menu" id="user-menu">
            <h2>${capitalise(org.name)} (organisation)</h2>
            <div id="user-option" class="user-option">
                <h2><i class="fa fa-user-circle-o" id="view-profile" aria-hidden="true"></i></h2>
                <div id="profile-modal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2>Welcome, ${capitalise(org.name)}</h2>
                        <p>EMAIL: ${org.email}</p>
                        <p>DESCRIPTION: ${org.description}</p>
                        <button id="edit-org-btn" class="btn" data-id=${org.id}>Edit profile <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                        <button id="del-org" class="btn" data-id=${org.id}>Delete account <i class="fa fa-trash" aria-hidden="true"></i></button>

                        <div id="edit-org-container" style="display:none">
                            <form id="edit-org-form">
                                <div class="block">
                                    Name: <input type="text" name="name" value="${org.name}"><br>
                                    Email: <input type="email" name="email" value="${org.email}"><br>
                                    Description: <input type="text" name="description" value="${org.description}">
                                    <input type="submit" value="done" data-id=${org.id}>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
                <h2 id="logout"><i class="fa fa-sign-out" id="logout" aria-hidden="true"></i></h2>
            </div>
        </div>
        
    </div>
    
    <div class="main">
        <h1>All My Events</h1>
        <div id="event-list"></div>

        <h1>Create new event</h1>
        <form id="create-event">
            <div class="block">
                Title: <input type="text" name="title" required><br>
                Location: <input type="text" name="location" required><br>
                Start date: <input type="datetime-local" name="start" required><br>
                End date: <input type="datetime-local" name="end" required><br>
                Dress Code: <input type="text" name="dresscode"><br>
                Speakers: <input type="text" name="speakers"><br>
                Contact Email: <input type="email" name="email"><br>
                Category:
                <select name="category" id="select-category">
                </select><br>
                Tags: <input type="text" name="tags"><br>
                <input type="submit" value="Create new event" data-id=${org.id} class="btn">
            </div>
        </form>

    </div>`
    
    let modal = document.getElementById("profile-modal");
    let btn = document.getElementById("org-profile");
    let span = document.getElementsByClassName("close")[0];

    /** open modal */
    document.addEventListener('click', function(e) {
        if (e.target.id === 'view-profile') {
            console.log(modal.style.display)
            modal.style.display = "block";
        }        
    })

    // btn.onclick = function() {
    //     debugger
    //     modal.style.display = "block";
    // }

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
}