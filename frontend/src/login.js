function studentLogin(){
    const studentLogin = document.getElementById('student-login')
    studentLogin.addEventListener('submit', function(e){
        e.preventDefault()
        const email = e.target[0].value
        
        let body = { email }
        baseAdapter.studentLogin(body)
        .then(data => {
            if (data.error) {
                console.log(data.error)
                alert(data.error)
            } else {
                localStorage.setItem("user_id", data.id)
                if (data.id) {
                    localStorage.setItem("type", "student")
                    displayStudentHomePage(data)
                } else {
                    displayLogin()
                }
            }
        })
    })
}

function orgLogin(){
    const orgLogin = document.getElementById('org-login')
    orgLogin.addEventListener('submit', function(e){
        e.preventDefault()
        const email = e.target[0].value
        let body = { email }
        baseAdapter.orgLogin(body)
        .then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                localStorage.setItem("user_id", data.id)
                if (data.id) {
                    localStorage.setItem("type", "organisation")
                    displayOrgHomePage(data)
                } else {
                    displayLogin()
                }
            }
        })
    })
}

function logout(){
    mainContainer.addEventListener('click', (e) => {
        if (e.target.id === 'logout') {
            localStorage.clear()
            displayLogin()
        }
    })
}