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

pages.loadPage = (page) => {
    eval("pages.page_" + page + "();")
}