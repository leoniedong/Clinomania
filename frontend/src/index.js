/***** URLs *****/
const BASE_URL = "http://localhost:3000"
const STUDENTS_URL = `${BASE_URL}/students`
const ORGS_URL = `${BASE_URL}/organisations`
const EVENTS_URL = `${BASE_URL}/events`
const TICKETS_URL = `${BASE_URL}/tickets`

/*** constants */
const mainContainer = document.querySelector('main')

/** document */
document.addEventListener('DOMContentLoaded', function(){
    /***** constants *****/
    const myTickets = document.getElementById('my-tickets')
    
    console.log('Content loaded')
    console.log(localStorage)


    /** if a user is logged in */
    if(localStorage.getItem('user_id')){

        const userId = localStorage.getItem('user_id')
        const userType = localStorage.getItem('type')

        /** display student */
        if (userType === 'student'){
            fetch(`${STUDENTS_URL}/${userId}`)
            .then(res => res.json())
            .then(user => {
                displayStudentHomePage(user)
            })
        } 

        /** display oragnisation */
        else if (userType === 'organisation') {
            console.log('user is logged in')
            fetch(`${ORGS_URL}/${userId}`)
            .then(res => res.json())
            .then(user => {
                displayOrgHomePage(user)
            })
        } else {
            displayLogin()
        }
    } 
    /** if no user if found */
    else {
        displayLogin()
    }
})


/*** functions */

function capitalise(word) {
    return word[0].toUpperCase() + word.slice(1)
}

function displayLogin() {
    mainContainer.innerHTML = `
    <div class="container" id="container">
        <div id="login" class="form-container login-container">
            <div class="pills">
                <h3 style="text-align:left;float:left;">Student login</h3>
                <h3 style="text-align:right;float:right;">Organisation login</h3>
            </div>
            <div id="render-login">
                <form id="student-login">
                    <h3>Student login</h3>
                    Email: <input type="email" name="email" placeholder:"Email address">
                    <input type="submit" class="button">
                </form>
            </div>
        </div>

        <div id="signup" class="form-container signup-container">
            <div class="pills">
                <h3 style="text-align:left;float:left;">New student</h3>
                <h3 style="text-align:right;float:right;">New organisation</h3>
            </div>
            
            <div id="render-signup">
                <form id="signup-student">
                    <h3>Create a new student account</h3>
                    <input type="text" name="firstname" placeholder="First Name (required)" required><br>
                    <input type="text" name="lastname" placeholder="Last name (required)" required><br>
                    <input type="email" name="email" placeholder="Email (required)" required><br>
                    Year: 
                    <select name="year">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select><br>
                    <input type="text" name="major" placeholder="Major"><br>
                    <input type="submit" value="create student account" class="button">
                </form>

            </div>
            
            
            
        </div>

        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>Have an account?</p>
                    <button class="button ghost" id="login-btn">Log In</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Don't have an account?</p>
                    <button class="button ghost" id="signup-btn">Sign Up</button> 
                </div>
            </div>
        </div>
    </div>
    `
    studentLogin()
    studentSignup()

    const userLogin = document.querySelector('div#login')
    const renderLogin = document.querySelector('div#render-login')
    userLogin.addEventListener('click', (e) => {
        /**  student login */
        if (e.target.innerText === 'Student login') {
            renderLogin.innerHTML = `
            <form id="student-login">
                <h3>Student login</h3>
                Email: <input type="email" name="email" placeholder:"Email address">
                <input type="submit" class="button">
            </form>`
            studentLogin()
        } 
        /** organisation login */
        else if (e.target.innerText === 'Organisation login') {
            renderLogin.innerHTML = `
            <form id="org-login">
                <h3>Organisation login</h3>
                Email: <input type="email" name="email" placeholder:"Email address">
                <input type="submit" class="button">
            </form>`
            orgLogin()
        }
    })
    
    const userSignup = document.querySelector('div#signup')
    const renderSignup = document.querySelector('div#render-signup')
    userSignup.addEventListener('click', (e) => {
        /** student signup */
        if (e.target.innerText === 'New student') {
            renderSignup.innerHTML = `
            <form id="signup-student">
                <h3>Create a new student account</h3>
                <input type="text" name="firstname" placeholder="First Name (required)" required><br>
                <input type="text" name="lastname" placeholder="Last name (required)" required><br>
                <input type="email" name="email" placeholder="Email (required)" required><br>
                Year: 
                <select name="year">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select><br>
                <input type="text" name="major" placeholder="Major"><br>
                <input type="submit" value="create student account" class="button">
            </form>`
            studentSignup()
        }
        /** organisation signup */
        else if (e.target.innerText === 'New organisation') {
            renderSignup.innerHTML = `
            <form id="signup-org">
                <h3>Create a new organisation account</h3>
                <input type="text" name="name" placeholder="Name (required)" required><br>
                <input type="email" name="email" placeholder="Email (required)" required><br>
                <input type="text" name="description" placeholder="Description"><br>
                <input type="submit" class="button" value="create organisation account">
            </form>`
            orgSignup()
        }
    })
    
    
    // /** student signup */
    // studentSignup()

    // /** organisation signup */
    // orgSignup()


    /** overlay transition */
    const signUpBtn = document.getElementById('signup-btn')
    const logInBtn = document.getElementById('login-btn')
    const container = document.getElementById('container')

    signUpBtn.addEventListener('click', ()=>{
        container.classList.add('right-panel-active')
    })

    logInBtn.addEventListener('click', ()=>{
        container.classList.remove('right-panel-active')
    })
}