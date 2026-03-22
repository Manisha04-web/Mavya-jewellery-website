// ===============================
// ADD TO CART FUNCTION
// ===============================
function addToCart(name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => 
    item.name === name && item.image === image
);

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

    updateCartCount();
    showToast("Item added to cart 🛒");
}

// ===============================
// UPDATE CART COUNT
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

// ===============================
// TOAST MESSAGE
// ===============================
function showToast(message){
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
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
// DISPLAY CART ITEMS
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
// BLOG MODAL
// ===============================
function openBlog() {
    document.getElementById("blogModal").classList.add("active");
    document.querySelector("header").style.display = "none";
}

function closeBlog() {
    document.getElementById("blogModal").classList.remove("active");
    document.querySelector("header").style.display = "flex";
}
window.onclick = function(event) {
    let modal = document.getElementById("blogModal");

    if (event.target === modal) {
        modal.classList.remove("active");
    }
}


// ===============================
// VARIANT SELECT
// ===============================
function selectVariant(clickedImg, price) {

    const productCard = clickedImg.closest(".product");
    const mainImage = productCard.querySelector(".main-product");
    const priceElement = productCard.querySelector(".price");

    mainImage.src = clickedImg.src;
    priceElement.textContent = price;
}


// ===============================
// VARIANT BORDER ACTIVE
// ===============================
document.querySelectorAll(".variants img").forEach(img => {
    img.addEventListener("click", function() {

        let parent = this.closest(".variants");

        parent.querySelectorAll("img")
        .forEach(i => i.style.border = "2px solid transparent");

        this.style.border = "2px solid #b76e79";
    });
});


// ===============================
// SEARCH FUNCTION (FIXED)
// ===============================
function searchProducts(){

    let input = document.getElementById("searchBar").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product => {

        let name = product.querySelector("h3").innerText.toLowerCase();

        if(name.includes(input)){
            product.style.display = "flex"; // ✅ FIX
        } else {
            product.style.display = "none";
        }

    });
}


// ===============================
// FADE-IN SCROLL ANIMATION
// ===============================
const faders = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
    faders.forEach(el => {
        let rect = el.getBoundingClientRect().top;

        if (rect < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
});


// ===============================
// OTHER MODALS
// ===============================
function openOffers() {
    document.getElementById("offersModal").classList.add("active");
}

function closeOffers() {
    document.getElementById("offersModal").classList.remove("active");
}

function openHelp() {
    document.getElementById("helpModal").classList.add("active");
}

function closeHelp() {
    document.getElementById("helpModal").classList.remove("active");
}

function openAbout() {
    document.getElementById("aboutModal").classList.add("active");
}

function closeAbout() {
    document.getElementById("aboutModal").classList.remove("active");
}


// ===============================
// LOGIN
// ===============================
function loginUser(){

    let name = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    if(name === "" || email === ""){
        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("userName", name);
    window.location.href = "index.html";
}

let userName = localStorage.getItem("userName");

if(userName){
    let profileLink = document.getElementById("profile-link");
    if(profileLink){
        profileLink.href = "#";
    }
}

window.onload = function () {
    updateCartCount();
};
