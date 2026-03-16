// ===============================
// ADD TO CART FUNCTION
// ===============================

function addToCart(name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount(); // 👈 add this

    showToast("Item added to cart 🛒");
}
function showToast(message){

    let toast=document.createElement("div");
    toast.className="toast";
    toast.innerText=message;

    document.body.appendChild(toast);

    setTimeout(()=>{
        toast.remove();
    },2000);
}

// ===============================
// CHANGE QUANTITY
// ===============================

function changeQty(index, change) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}



// ===============================
// REMOVE ITEM
// ===============================

function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}



// ===============================
// DISPLAY CART ITEMS (Cart Page)
// ===============================

if (document.getElementById("cart-items")) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let total = 0;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is feeling lonely 🥺</h3>
                <p>Add some beautiful jewellery to shine today ✨</p>
                <a href="index.html" class="shop-btn">Continue Shopping</a>
            </div>
        `;
    }

    cart.forEach((item, index) => {

        total += Number(item.price) * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">

                <div class="cart-left">
                    <img class="cart-img" src="${item.image}" alt="${item.name}">

                    <div class="cart-details">
                        <h3>${item.name}</h3>
                        <p>Rs. ${item.price}</p>

                        <div class="quantity-box">
                            <button onclick="changeQty(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQty(${index}, 1)">+</button>
                        </div>
                    </div>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    document.getElementById("total").innerText = "Total: Rs. " + total;
}



// ===============================
// UPDATE CART COUNT (Navbar)
// ===============================

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = 0;

    cart.forEach(item => {
        cartCount += item.quantity;
    });

    let countElement = document.getElementById("cart-count");

    if (countElement) {
        countElement.innerText = cartCount;
    }

}

/* BLOg part */
function openBlog() {
    document.getElementById("blogModal").classList.add("active");
}

function closeBlog() {
    document.getElementById("blogModal").classList.remove("active");
}

window.onclick = function(event) {

    let modal = document.getElementById("blogModal");

    if(event.target === modal){
        modal.classList.remove("active");
    }

}

/* function display cart */
function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");

    cartContainer.innerHTML = "";

    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="80">
                <h3>${item.name}</h3>
                <p>Rs. ${item.price}</p>
            </div>
        `;
    });
}

function selectVariant(clickedImg, price) {
    console.log("Clicked price is:", price);

    const productCard = clickedImg.closest(".product");
    if (!productCard) return;

    const mainImage = productCard.querySelector(".main-product");
    const priceElement = productCard.querySelector(".price");

    if (mainImage) {
        mainImage.src = clickedImg.src;
    }

    if (priceElement) {
        priceElement.textContent = price;
    }
}

document.querySelectorAll(".variants img").forEach(img=>{
    img.addEventListener("click",function(){

        let parent = this.closest(".variants");
        parent.querySelectorAll("img").forEach(i=>i.style.border="2px solid transparent");

        this.style.border="2px solid #b76e79";
    });
});


/* dark mode*/
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

/******************************/

function searchProducts(){

    let input = document.getElementById("searchBar").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product => {

        let name = product.querySelector("h3").innerText.toLowerCase();

        if(name.includes(input)){
            product.style.display = "block";
        }else{
            product.style.display = "none";
        }

    });
}
updateCartCount();

/***offer section***/
function openOffers() {
    document.getElementById("offersModal").classList.add("active");
}

function closeOffers() {
    document.getElementById("offersModal").classList.remove("active");
}

/**help section**/
function openHelp() {
document.getElementById("helpModal").classList.add("active");
}

function closeHelp() {
document.getElementById("helpModal").classList.remove("active");
}

/**about section**/
function openAbout() {
document.getElementById("aboutModal").classList.add("active");
}

function closeAbout() {
document.getElementById("aboutModal").classList.remove("active");
}

/**login function**/
function loginUser(){

let name=document.getElementById("username").value;
let email=document.getElementById("email").value;

if(name==="" || email===""){
alert("Please fill all fields");
return;
}

localStorage.setItem("userName",name);

window.location.href="index.html";

}

let userName = localStorage.getItem("userName");

if(userName){

let profileLink=document.getElementById("profile-link");

if(profileLink){
profileLink.href="#";
}

}
