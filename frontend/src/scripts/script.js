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
    const link = document.getElementsByClassName("navbar-link")

    link[0].style.textDecoration  = "underline"
    link[1].style.textDecoration  = "none"
    link[2].style.textDecoration  = "none"
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

    const menu = pages.getElement("menu")
    const drop = pages.getElement("drop-down")
    const list_items = document.getElementsByClassName("drop-down-items")
    
    pages.handleNavbar(menu, drop, list_items)

    list_items[0].style.textDecoration  = "underline"
    list_items[1].style.textDecoration  = "none"
    list_items[2].style.textDecoration  = "none"
}
pages.page_favorite = () => {
    const link = document.getElementsByClassName("navbar-link")

    link[0].style.textDecoration  = "none"
    link[1].style.textDecoration  = "underline"
    link[2].style.textDecoration  = "none"

    const menu = pages.getElement("menu")
    const drop = pages.getElement("drop-down")
    const list_items = document.getElementsByClassName("drop-down-items")
    
    pages.handleNavbar(menu, drop, list_items)
    list_items[0].style.textDecoration  = "none"
    list_items[1].style.textDecoration  = "underline"
    list_items[2].style.textDecoration  = "none"
}
pages.page_cart = () => {
    const link = document.getElementsByClassName("navbar-link")

    link[0].style.textDecoration  = "none"
    link[1].style.textDecoration  = "none"
    link[2].style.textDecoration  = "underline"

    const menu = pages.getElement("menu")
    const drop = pages.getElement("drop-down")
    const list_items = document.getElementsByClassName("drop-down-items")
    
    pages.handleNavbar(menu, drop, list_items)
    list_items[0].style.textDecoration  = "none"
    list_items[1].style.textDecoration  = "none"
    list_items[2].style.textDecoration  = "underline"
}
pages.page_admin = () => {
    const normal = document.getElementsByClassName("normal")
    const hover = document.getElementsByClassName("hover")
    const add = document.getElementById("add-product")
    const edit = document.getElementById("edit")
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
    add.addEventListener('click', function(){
        window.location.href = "add_product.html"
    })
    edit.addEventListener('click',function(){
        window.location.href = "edit_product.html"
    })
}

pages.page_add_product = () => {
    pages.handleAdminEditAdd()

}
pages.page_edit_product = () => {
    pages.handleAdminEditAdd()
}
pages.handleAdminEditAdd = () => {
    const image_holder = pages.getElement("image-holder")
    const image_input = pages.getElement("input-image")
    let image =""
    const upload_text = pages.getElement("text-upload")
    let image_uploaded = image_holder.style.backgroundImage != ''
    image_holder.addEventListener('click',function(){
        image_input.click()
    })
    image_input.addEventListener('change',function(){
        const reader = new FileReader()
        reader.addEventListener('load',function(){
            image = reader.result
            upload_text.style.display="none"
            image_uploaded =true
            image_holder.style.backgroundImage = `url(${image})`
        })
        reader.readAsDataURL(this.files[0])
    })
    const cat = pages.getElement("cat")
    const cat_menu = pages.getElement("cat-menu")
    const cat_items = document.getElementsByClassName("choose-cat")
    let cat_choosed = false
    cat.addEventListener('click',function(){
        cat_menu.style.display = "block"
        for(let i = 0; i<cat_items.length ; i++){
            cat_items[i].addEventListener('click',function(event){
                event.stopImmediatePropagation();
                cat_menu.style.display = "none"
                cat_choosed =true
            })
        }
    })
    const product_name = pages.getElement('name-product').value
    const product_price = pages.getElement('price').value
    const product_description = pages.getElement('description').value
    const add_button = pages.getElement('add-button')
    const container = pages.getElement('product-add-container')
    const model =pages.getElement('model-add-product')
    const header = pages.getElement('model-h1-add')
    const text = pages.getElement('model-h4-add')
    const button_back = pages.getElement('add-back')
    add_button.addEventListener('click',function(){
        if(!product_name || !product_price || !product_description || !image_uploaded || !cat_choosed){
            container.style.display ="none"
            model.style.display ="flex"
            header.innerHTML = "Warning !!"
            text.innerHTML = "You should fill all the fields"
        }
    })
    button_back.addEventListener('click',function(){
        window.location.href = "add_product.html"
    })
}
pages.handleNavbar = (menu, drop , drop_items) => {
    menu.addEventListener('click',function(){
        console.log("menu clicked")
        drop.style.display = "flex"
    })
    for(let i =0;i<drop_items.length;i++){
        drop_items[i].addEventListener('click', function(){
            drop.style.display = "none"
        })
    }
}
pages.loadPage = (page) => {
    eval("pages.page_" + page + "();")
}