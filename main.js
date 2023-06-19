

const mainContainer = document.querySelector("#main")
const loginPageButton = document.querySelector("#loginPage")

let token

loginPageButton.addEventListener("click", displayLoginPage)

function clearMainContainer(){
    mainContainer.innerHTML= ""
}
function display(content){
    //vider la div principale
    clearMainContainer()
    //et y ajouter le contenu qu'elle recoit

    mainContainer.innerHTML=content
}

function getLoginTemplate(){
    let template = `   
    <div class="contain contain-register ">
                <div class="register container d-flex row  ">
                            <div class="mb-4">
                        <h1>Login </h1>
                        
                            </div>
                        <input type="text" id="usernameLogin" class="form-control mb-3" placeholder="Username">
                        <input type="password" id="passwordLogin" class="form-control mb-3" placeholder="Password">
                        <button class="btn btn-primary mb-3 " id="loginButton">Log In</button>
                        <span id="errorpassword" class="text-warning"></span>
                 </div>
                 </div>`

    return template
}

function displayLoginPage() {
    display(getLoginTemplate())
    //buttons conts & event listeners
    const usernameLogin = document.querySelector('#usernameLogin')
    const passwordLogin = document.querySelector('#passwordLogin')
    const loginButton = document.querySelector('#loginButton')
    loginButton.addEventListener("click", login)
}

function login() {
    let url = "https://charlesagostinelli.com/api/login/login_check"
    let body = {
        username: usernameLogin.value,
        password: passwordLogin.value
    }


    let bodySerialise = JSON.stringify(body)

    let fetchParams = {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: bodySerialise

    }


    fetch(url, fetchParams)
        .then(response => response.json())

        .then(data => {


            if (data.token) {
                token = data.token
                currentuser = usernameLogin.value
                document.querySelector(".btnRegisterSignup").innerHTML = `
                <p class="text-light ms-5">${usernameLogin.value}</p> 
                   <button class="btn text-light ms-4 " id="logout"> <i class="bi bi-box-arrow-in-right"></i>Log out</button>
               
                `
            } else {
                displayLoginPage()
                errorpassword.innerHTML = "ERROR username or password"

            }

        })


}

displayLoginPage()