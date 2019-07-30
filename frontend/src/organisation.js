function displayOrgHomePage(org){

    let editOrg = false

    displayOrgMainContent(org)

    /** edit org profile */
    document.addEventListener('click', function(e){
        if (e.target.id === 'edit-org-btn') {
            let orgForm = document.querySelector('.container')
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
}