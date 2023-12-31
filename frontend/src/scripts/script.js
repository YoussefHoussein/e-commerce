const pages = {}

pages.getElement = (id) => document.getElementById(id);

pages.page_index = () => {
    const button_login = pages.getElement("login-button")
    const model = pages.getElement("model")
    const main_container = pages.getElement("main-container")
    const model_h1 = pages.getElement("model-h1")
    const model_h4 = pages.getElement("model-h4")
    const back = pages.getElement("login-back")
    button_login.addEventListener('click', function(){
        const email = pages.getElement("email-login").value
        const password = pages.getElement("password-login").value
        if(email =="" || password==""){
            main_container.style.display = "none"
            model.style.display = "flex"
            model_h1.innerHTML = "Warning !!"
            model_h4.innerHTML = "You should fill all the fields"
        }
        else{
            const data = new FormData()
            data.append("email",email)
            data.append("password",password)

            fetch("http://127.0.0.1:8000/api/login" , {
                method: "POST",
                body: data
            })
            .then(response => response.json())
            .then(data => {
              if(data.status == "success"){
                localStorage.setItem('user_id',data.user_id)
                localStorage.setItem('cart_id',data.cart_id)
                localStorage.setItem('favorite_id',data.favorite_id)
                if(data.role_id == 1){
                    window.location.href = "src/pages/admin.html"
                }
                else{
                    window.location.href = "src/pages/dashboard.html"
                }
              }
              else if( data.status == "Wrong Password"){
                main_container.style.display = "none"
                model.style.display = "flex"
                model_h1.innerHTML = "Warning !!"
                model_h4.innerHTML = "Wrong Password"
              }
              else{
                main_container.style.display = "none"
                model.style.display = "flex"
                model_h1.innerHTML = "Warning !!"
                model_h4.innerHTML = "User not exist."
              }
            })
            .catch(error => console.log(error))
        }
        
    })
    back.addEventListener('click',function () {
        window.location.href = "index.html"
    })
   
}

pages.page_register = () => {

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
    let role_choosed = false
    let role_id =0;
    role.addEventListener('click', function(){
        choose.style.display = "block"

        admin.addEventListener('click', function(event){
            event.stopImmediatePropagation();
            choose.style.display = "none"
            role_choosed = true
            console.log(role_choosed)
            role_id=1
        })
        user.addEventListener('click', function(event){
            event.stopImmediatePropagation();
            choose.style.display = "none"
            role_choosed = true
            role_id=2
        })
    })
    button_login.addEventListener('click', function(){
        const first_name =pages.getElement('first-name-signup').value
         const last_name = pages.getElement("last-name-signup").value
        const email = pages.getElement("email-signup").value
        const password = pages.getElement("password-signup").value
        if(first_name == "" || last_name == "" || email=="" || password == "" || !role_choosed){
            console.log(password)
            console.log(first_name)
            console.log(last_name)
            console.log(email)
            console.log(role_choosed)
            main_container.style.display = "none"
            model.style.display = "flex"
            model_h1.innerHTML = "Warning !!"
            model_h4.innerHTML = "You should fill all the fields"
        }
        else{
            const data = new FormData()
            data.append("first_name",first_name)
            data.append("last_name",last_name)
            data.append("email",email)
            data.append("password",password)
            data.append("role_id",role_id)

            fetch("http://127.0.0.1:8000/api/signup" , {
                method: "POST",
                body: data
            })
            .then(response => response.json())
            .then(data => {
              if(data.status == "success"){
                localStorage.setItem('user_id',data.user_id)
                localStorage.setItem('cart_id',data.cart_id)
                localStorage.setItem('favorite_id',data.favorite_id)
                if(data.role_id == 1){
                    window.location.href = "admin.html"
                }
                else{
                    window.location.href = "dashboard.html"
                }
              }
              else{
                main_container.style.display = "none"
                 model.style.display = "flex"
                 model_h1.innerHTML = "Warning !!"
                model_h4.innerHTML = "User already exists"
              }
            })
            .catch(error => console.log(error))
        }

    })
    back.addEventListener('click',function () {
        window.location.href = "register.html"
    })
    
}
pages.createDashboardCard = (id,name,price,image,description,category) =>{
    return `
    <div class="card normal login-container flex">
                <img src="${image}" alt="product-image" class="product-image">
                <h1>${name}</h1>
            </div>
            <div class="card login-container hover">
                <div class="card-header flex">
                    <img src="${image}" alt="hover-image" class="hover-image">
                    <h1>${name}</h1>
                    <h1>${price}</h1>
                </div>
                <div class="card-description flex">
                    <p>
                     ${description}
                    </p>
                </div>
                <div class="card-header footer flex">
                    <h1>${category}</h1>
                    <img src="../images/love.png" alt="favorite" class="favorite-image">
                    <img src="../images/shopping-cart.png" alt="cart" class="cart-image">
                </div>
                <div class="id-field" id="id_field">${id}</div>
            </div>
    `
}
pages.hover = () =>{
    const normal = document.getElementsByClassName("normal")
    const hover = document.getElementsByClassName("hover")
    
    for(let i =0 ; i< normal.length;i++){
        normal[i].addEventListener('mouseover',function(){
            hover[i].style.display = "flex"
            normal[i].style.display = "none"
        })
        normal[i].addEventListener('mouseleave',function(){
            hover[i].style.display = "none"
            normal[i].style.display = "flex"
        })
    }
}
pages.page_dashboard = async () => {
    let isFavorite = []
    let inCart = []
    let product_id_array =[]
    const dashboard = pages.getElement("dash-board-container")
    try{
        const response = await fetch("http://127.0.0.1:8000/api/getproducts")
        const json = await response.json()
        json.forEach(product => {
            const id =product.id;
            const name = product.name;
            const price = product.price;
            const description = product.description;
            const category = product.category
            const image = product.image
            let new_item = pages.createDashboardCard(id,name,price,image,description,category)
            dashboard.innerHTML += new_item
            product_id_array.push(id)

            });
            localStorage.setItem("array",product_id_array)
            
        
      }
      catch(e){
        console.log("Error: "+e)
      }
    
    let array = localStorage.getItem("array")
    const array_id = array.split(",");
    for(let i =0 ;i<array_id.length;i++){
        const data = new FormData()
        data.append("favorite_id",localStorage.getItem("favorite_id"))
        data.append("product_id",array_id[i])
        

             
            fetch("http://127.0.0.1:8000/api/checkproductinfavorite", {
             method : "POST",
            body: data
            })
            .then(response => response.json())
            .then(data => {
                
             if(data.status == "success"){
                isFavorite.push(true)
                
            }
            else{
                isFavorite.push(false)
            }
            if(isFavorite[i]){
                
                fav[i].src = "file:///C:/Users/Youssef/Desktop/e-commerce/frontend/src/images/heart.png"
            }
            else{
                fav[i].src = "file:///C:/Users/Youssef/Desktop/e-commerce/frontend/src/images/love.png"
            }

            fav[i].addEventListener('click',function(){
        
                if(!isFavorite[i]){
                    const favorite_id = localStorage.getItem("favorite_id")
                    const product_id = array_id[i]
                    const data =  new FormData()
                    data.append("favorite_id",favorite_id)
                    data.append("product_id",product_id)
        
                    fetch("http://127.0.0.1:8000/api/inserttofavorite", {
                        method : "POST",
                        body: data
                    })
                    .then(response => response.json())
                    .then(data => {
                        if(data.status == "success"){
                            fav[i].src="file:///C:/Users/Youssef/Desktop/e-commerce/frontend/src/images/heart.png"
                            window.location.href = "dashboard.html"
                            pages.hover()
                        }
                    })
                    .catch(error => console.log(error))
                    
                }
                else{
                    const favorite_id = localStorage.getItem("favorite_id")
                    const product_id = array_id[i]
                    const data =  new FormData()
                    data.append("favorite_id",favorite_id)
                    data.append("product_id",product_id)
        
                    fetch("http://127.0.0.1:8000/api/removeproductfromfavorite", {
                        method : "POST",
                        body: data
                    })
                    .then(response => response.json())
                    .then(data => {
                        if(data.status == "success"){
                            fav[i].src="file:///C:/Users/Youssef/Desktop/e-commerce/frontend/src/images/love.png"
                            window.location.href = "dashboard.html"
                            pages.hover()
                        }
                    })
                    .catch(error => console.log(error))
                    
                }
            })
         }) 
            .catch(error => console.log(error))
            
            const data1 = new FormData()
                data1.append("product_id",array_id[i])
                data1.append("cart_id",localStorage.getItem("cart_id"))
                
                fetch("http://127.0.0.1:8000/api/checkproductincart", {
                    method : "POST",
                    body: data1
                })
                .then(response => response.json())
                .then(data => {
                  if(data.status == "success"){
                    inCart.push(true)
                  }
                  else{
                    inCart.push(false)
                  }
                  if(inCart[i]){
                    cart[i].src= "file:///C:/Users/Youssef/Desktop/e-commerce/frontend/src/images/shopping-cart (1).png"
                }
            else{
                cart[i].src="file:///C:/Users/Youssef/Desktop/e-commerce/frontend/src/images/shopping-cart.png"
             }

             cart[i].addEventListener('click',function(){
        
                if(!inCart[i]){
                    
                    const cart_id = localStorage.getItem("cart_id")
                    const product_id = array_id[i]
                    const data =  new FormData()
                    data.append("cart_id",cart_id)
                    data.append("product_id",product_id)
        
                    fetch("http://127.0.0.1:8000/api/inserttocart", {
                        method : "POST",
                        body: data
                    })
                    .then(response => response.json())
                    .then(data => {
                        if(data.status == "success"){
                            cart[i].src= "file:///C:/Users/Youssef/Desktop/e-commerce/frontend/src/images/shopping-cart (1).png"
                            window.location.href = "dashboard.html"
                            pages.hover()
                        }
                    })
                    .catch(error => console.log(error))
                    
                }
                else{
                    const cart_id = localStorage.getItem("cart_id")
                    const product_id = array_id[i]
                    const data =  new FormData()
                    data.append("cart_id",cart_id)
                    data.append("product_id",product_id)
        
                    fetch("http://127.0.0.1:8000/api/removeproductfromcart", {
                        method : "POST",
                        body: data
                    })
                    .then(response => response.json())
                    .then(data => {
                        if(data.status == "success"){
                            cart[i].src="file:///C:/Users/Youssef/Desktop/e-commerce/frontend/src/images/shopping-cart.png"
                            window.location.href = "dashboard.html"
                            pages.hover()
                        }
                    })
                    .catch(error => console.log(error))
                    
                    
                }
            })
                })
                .catch(error => console.log(error))
                
    }
    const cart = document.getElementsByClassName("cart-image")
    
    const fav = document.getElementsByClassName("favorite-image")
        
    
    pages.hover()
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
        normal[i].addEventListener('mouseleave',function(){
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
pages.createFavoriteCard = (id,name,image,description,category) =>{
    return `
    <div class="favorite-card flex" id="favorite-container">
                <div class="img-container flex">
                    <img src="${image}" alt="product image" class="favorite-product-image">
                    <div class="favorite-name flex">
                    <p class="name">${name}</p>
                    <p class="category">${category}</p>
                    </div>
                </div>
                <div class="favorite-description">
                    ${description}
                </div>
                <div class="icons">
                    <img src="../images/heart.png" alt="favortie" id="fav_image">
                    
                </div>
                <div class="id-field" id="id_field">${id}</div>
    </div>
    `
}
pages.page_favorite = () => {
    
    const favorite_container = pages.getElement("favorite-container")
    const fav_id = localStorage.getItem("favorite_id")
    const data = new FormData()
    data.append("favorite_id",fav_id)

    fetch("http://127.0.0.1:8000/api/getproductsinfavorite", {
        method : "POST",
        body: data
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(product =>{
            if(data.status != "favorite is empty"){
                const id = product.id
                
                const name = product.name
                const category = product.category
                const image = product.image
                const description = product.description
                favorite_container.innerHTML += pages.createFavoriteCard(id,name,image,description,category)
                
                
                const fav =  pages.getElement("fav_image")
                
                fav.addEventListener('click',function(){
                   
                    const data =  new FormData()
                    data.append("product_id",id)
                    console.log(id)
                    data.append("favorite_id",fav_id)
                    fetch("http://127.0.0.1:8000/api/removeproductfromfavorite", {
                        method : "POST",
                        body: data
                    })
                    .then(response => response.json())
                    .then(data => {
                        
                        if(data.status == "success"){
                            favorite_container.remove()
                        }
                        })
                        .catch(error => console.log(error))
                
                })
            }
        })
        
       
    })
    .catch(error => console.log(error))

    
    
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
    
    
    

pages.createCartCard = (id,name,price,image,description,category) =>{
    return `
    <div class="favorite-card flex" id="cart-container">
    <div class="img-container flex">
        <img src="${image}" alt="product image" class="favorite-product-image">
        <div class="favorite-name flex">
        <p class="name">${name}</p>
        <p class="category">${category}</p>
        </div>
    </div>
    <div class="favorite-description">
        ${description}
    </div>
    <div class="price flex">
        <div>${price}</div>
        <div>100$</div>
    </div>
    <div class="icons flex">
        
        <img src="../images/shopping-cart (1).png" alt="cart" id="cart-image">
    </div>
    <div class="id-field" id="id_field">${id}</div>
</div>
    `
}
pages.page_cart = () => {
    const cart = pages.getElement("cart_card")
    const cart_id = localStorage.getItem("cart_id")
    const data = new FormData()
    data.append("cart_id",cart_id)

    fetch("http://127.0.0.1:8000/api/getproductsincart", {
        method : "POST",
        body: data
    })
    .then(response => response.json())
    .then(product => {
        product.forEach(data =>{
            if(product.status != "cart is empty"){
                const id = data.id
                const name = data.name
                const price =data.price
                const category = data.category
                const image = data.image
                const description = data.description
                cart.innerHTML += pages.createCartCard(id,name,price,image,description,category)

                const cart_container = pages.getElement('cart-container')
                const cart_image = pages.getElement("cart-image")
                cart_image.addEventListener('click',function(){
                
                const data =  new FormData()
                 data.append("product_id",id)
                
                 data.append("cart_id",cart_id)
                fetch("http://127.0.0.1:8000/api/removeproductfromcart", {
                     method : "POST",
                     body: data
                })
                .then(response => response.json())
                .then(data => {
                     if(data.status == "success"){
                        cart_container.remove()
                    }
                    })
                    .catch(error => console.log(error))
    
    })
                    
            }
        })
        
    })
    .catch(error => console.log(error))


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
pages.createAdminCard = (id,name,price,description,category,image) => {
    return `
    <div id="container">
                <div class="card normal login-container flex">
                    <img src="${image}" alt="product-image" class="product-image">
                    <h1>${name}</h1>
                </div>
                <div class="card login-container hover">
                    <div class="card-header flex">
                        <img src="../images/WhatsApp Image 2023-06-28 at 09.08.03.jpg" alt="hover-image" class="hover-image">
                        <h1>${name}</h1>
                        <h1>${price}</h1>
                    </div>
                    <div class="card-description flex">
                        <p>
                          ${description}
                        </p>
                    </div>
                    <div class="card-header footer flex">
                        <h1>${category}</h1>
                        <img src="../images/pencil.png" alt="edit" class="edit">
                        <img src="../images/delete.png" alt="delete" class="delete">
                    </div>
                </div>
                <div class="id-field" id="id_field">${id}</div>
            </div>
    `
}
pages.page_admin = async () => {
    const admin_dashboard = pages.getElement("admin-container")
    try{
        const response = await fetch("http://127.0.0.1:8000/api/getproducts")
        const json = await response.json()
        json.forEach(product => {
            const id =product.id;
            const name = product.name;
            const price = product.price;
            const description = product.description;
            const category = product.category
            const image = product.image
            let new_item = pages.createAdminCard(id,name,price,description,category,image)
            admin_dashboard.innerHTML += new_item
            

            // const data = new FormData()
            // data.append("product_id",id)
            // fetch("http://127.0.0.1:8000/api/getImage",{
            //     method: 'POST',
            //     body: data,
            // })
            // .then(response => response.blob())
            // .then(blob => {
            //     const imageURL = URL.createObjectURL(blob);
            //     console.log(imageURL)
                
            // })
            // .catch(error => {
            //     console.error('Error fetching image:', error);
            // });
            
        })
    }
      catch(e){
        console.log("Error: "+e)
      }

      

      let ids = []
      try{
        const response = await fetch("http://127.0.0.1:8000/api/getproductsids")
        const json = await response.json()
        ids = json;

        const edit = document.getElementsByClassName("edit")
        for(let i=0;i<edit.length;i++){
            edit[i].addEventListener('click',function(){
                localStorage.setItem("product_id",ids[i])
                window.location.href = "edit_product.html"
            })
        }
        const delete_buttons = document.getElementsByClassName("delete")
        for(let i=0;i<edit.length;i++){
            delete_buttons[i].addEventListener('click',function(){
                const data = new FormData()
                data.append("id",ids[i])
                
                fetch('http://127.0.0.1:8000/api/deleteproduct',{
                    method: 'POST',
                    body: data,
                })
                .then(response => response.json())
                .then(data => {
                if(data.status == "success"){
                    window.location.href = "admin.html"
                }
            })
            .catch(error => console.log(error))
            })
        }
    }
      catch(e){
        console.log("Error: "+e)
      }
    const normal = document.getElementsByClassName("normal")
    const hover = document.getElementsByClassName("hover")
    const add = document.getElementById("add-product")
    
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
    
    
}

pages.page_add_product = () => {
    const add_button = pages.getElement('add-button')

    add_button.addEventListener('click',function(){
        const name = pages.getElement('name-product').value
        const price = pages.getElement('price').value
        const description = pages.getElement('description').value
        const category = pages.getElement("category").value
        const image_input = pages.getElement("input-image")
       

    const container = pages.getElement('product-add-container')
    const model =pages.getElement('model-add-product')
    const header = pages.getElement('model-h1-add')
    const text = pages.getElement('model-h4-add')
    const button_back = pages.getElement('add-back')
        
        
              
    let image = image_input.files[0]        
                
                
                
               

        if (name && price && description && category && image_input.files.length !== 0 ) {
            const data = new FormData();
            data.append('name', name);
            data.append('description', description);
            data.append('price', price);
            data.append('category', category);
            data.append('image', image);
            
            fetch('http://127.0.0.1:8000/api/addproduct', {
                method: 'POST',
                body: data,
            })
            .then((response) => {
               if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            return response.json();
      })
      .then((data) => {
        if (data.status === 'success') {
          
          window.location.href = 'admin.html';
        } else {
          
          console.error('Error:', data.message);
        }
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
      });
  } else {
            container.style.display ="none"
            model.style.display ="flex"
            header.innerHTML = "Warning !!"
            text.innerHTML = "You should fill all the fields"
    
  }
  button_back.addEventListener('click',function(){
    window.location.href = "add_product.html"
})

    })  
    

}
pages.page_edit_product =  () => {
    const id = localStorage.getItem("product_id")
    
    const data = new FormData()
    data.append("id",id)
    fetch("http://127.0.0.1:8000/api/getproductsbyid", {
        method : "POST",
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } )
    .then(data => {
        const name = data.name;
        const price = data.price
        const description = data.description
        const category =data.category
        const name_input = pages.getElement("name-product")
        name_input.value = name
        const price_input = pages.getElement("price")
        price_input.value= price
        const description_input = pages.getElement("description")
        description_input.value=description
        const category_input = pages.getElement("category")
        category_input.value=category
        
        
    })
    .catch(error => console.log(error))

    const edit_button = pages.getElement("edit-button")

    edit_button.addEventListener('click',function(){
        const name_input = pages.getElement("name-product").value
        const price_input = pages.getElement("price").value
        const description_input = pages.getElement("description").value
        const category_input = pages.getElement("category").value
        const image_input = pages.getElement("input-image")
        let image = image_input.files[0] 



        const container = pages.getElement('product-add-container')
    const model =pages.getElement('model-add-product')
    const header = pages.getElement('model-h1-add')
    const text = pages.getElement('model-h4-add')
    const button_back = pages.getElement('add-back')

        if (name_input && price_input && description_input && category_input && image_input.files.length !== 0 ) {
            const data = new FormData();
            data.append('id',id)
            data.append('name', name_input);
            data.append('description', description_input);
            data.append('price', price_input);
            data.append('category', category_input);
            data.append('image', image);
            
            fetch('http://127.0.0.1:8000/api/editproduct', {
                method: 'POST',
                body: data,
            })
            .then((response) => {
               if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            return response.json();
      })
      .then((data) => {
        if (data.status === 'success') {
          
          window.location.href = 'admin.html';
        } else {
          
          console.error('Error:', data.message);
        }
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
      });
  } else {
            container.style.display ="none"
            model.style.display ="flex"
            header.innerHTML = "Warning !!"
            text.innerHTML = "You should fill all the fields"
    
  }
  button_back.addEventListener('click',function(){
    window.location.href = "edit_product.html"
})

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