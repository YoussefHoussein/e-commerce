const pages = {}

pages.getElement = (id) => document.getElementById(id);

pages.page_index = () => {
    const email = pages.getElement("email-login").value
    const password = pages.getElement("password-login").value
    const button_login = pages.getElement("login-button")
    const model = pages.getElement("model")
    const main_container = pages.getElement("main-container")
    const model_h1 = pages.getElement("model-h1")
    const model_h4 = pages.getElement("model-h4")
    const back = pages.getElement("login-back")
    button_login.addEventListener('click', function(){
        if(!email || !password){
            main_container.style.display = "none"
            model.style.display = "flex"
            model_h1.innerHTML = "Warning !!"
            model_h4.innerHTML = "You should fill all the fields"
        }
        
    })
    back.addEventListener('click',function () {
        window.location.href = "index.html"
    })
   
}

pages.page_register = () => {
    const first_name =pages.getElement("first-name-signup").value
    const last_name = pages.getElement("last-name-signup").value
    const email = pages.getElement("email-signup").value
    const password = pages.getElement("password-signup").value
    const role = pages.getElement("role")
    const button_login = pages.getElement("button-register")
    const main_container = pages.getElement("signup-container")
    const model_h1 = pages.getElement("model-h1-signup")
    const model_h4 = pages.getElement("model-h4-signup")
    const back = pages.getElement("signup-back")
    const model = pages.getElement("model-signup")
    const choose = pages.getElement("role-choose")
    const admin  =pages.getElement("admin")
    const user = pages.getElement("user")
    const role_choosed = false
    button_login.addEventListener('click', function(){
        if(!first_name || !last_name || !email || !password || !role_choosed){
            main_container.style.display = "none"
            model.style.display = "flex"
            model_h1.innerHTML = "Warning !!"
            model_h4.innerHTML = "You should fill all the fields"
        }

    })
    back.addEventListener('click',function () {
        window.location.href = "register.html"
    })
    role.addEventListener('click', function(){
        choose.style.display = "block"

        admin.addEventListener('click', function(event){
            event.stopImmediatePropagation();
            choose.style.display = "none"
            role_choosed = true
        })
        user.addEventListener('click', function(event){
            event.stopImmediatePropagation();
            choose.style.display = "none"
            role_choosed = true
        })
    })
}

pages.page_dashboard = () => {
    const normal = document.getElementsByClassName("normal")
    const hover = document.getElementsByClassName("hover")

    for(let i =0 ; i< normal.length;i++){
        normal[i].addEventListener('mouseover',function(){
            hover[i].style.display = "flex"
            normal[i].style.display = "none"
        })
        normal[i].addEventListener('mouseout',function(){
            hover[i].style.display = "none"
            normal[i].style.display = "flex"
        })
    }
}
pages.loadPage = (page) => {
    eval("pages.page_" + page + "();")
}