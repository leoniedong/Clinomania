function studentSignup(){
    const signupStudent = document.getElementById('signup-student')
    signupStudent.addEventListener('submit', function(e){
        e.preventDefault()
        fetch(STUDENTS_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "first_name": e.target.firstname.value, 
                "last_name": e.target.lastname.value,
                "email": e.target.email.value, 
                "year": e.target.year.value, 
                "major": e.target.major.value
            })
        })
        .then(res => res.json())
        .then(student => {
            if (student.error){
                // debugger
                alert(JSON.stringify(student.error.join('\n')))
            } else {
                displayStudentHomePage(student)
            }
        })
    })
}

function orgSignup(){
    const signupOrg = document.getElementById('signup-org')
    signupOrg.addEventListener('submit', function(e){
        e.preventDefault()
        fetch(ORGS_URL, {
            method: "POST",
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
        .then(org => {
            if (org.error){
                debugger
                alert(JSON.stringify(org.error.join('\n')))
            } else {
                displayOrgHomePage(org)
            }
        })
    })
}