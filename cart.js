document.addEventListener("DOMContentLoaded", function () {
    loadCartItems();

    function loadCartItems() {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        let cartBody = document.getElementById("cart-body");
        let totalPrice = 0;

        cartBody.innerHTML = "";

        cartItems.forEach((item, index) => {
            let subtotal = item.price * item.quantity;
            totalPrice += subtotal;

            let customization = item.customization ? item.customization : "";
            let imagePreview = item.imageUpload ? `<img src="${item.imageUpload}" width="50px">` : "";

            let row = document.createElement("tr");
            row.innerHTML = `
                <td><a href="#" class="remove-item" data-index="${index}"><i class='bx bxs-message-alt-minus'></i></a></td>
                <td><img src="${item.image}" width="80px"></td>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td><input type="number" class="quantity" value="${item.quantity}" min="1" data-index="${index}"></td>
                <td>
                    <input type="text" class="custom-text" placeholder="Enter text" value="${customization}" data-index="${index}">
                    <input type="file" class="custom-image" accept="image/*" data-index="${index}">
                    <div class="image-preview">${imagePreview}</div>
                </td>
                <td class="subtotal">₹${subtotal}</td>
            `;
            cartBody.appendChild(row);
        });

        document.getElementById("total-price").innerText = "₹" + totalPrice;

        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll(".quantity").forEach(input => {
            input.addEventListener("change", updateQuantity);
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", removeItem);
        });

        document.querySelectorAll(".custom-text").forEach(input => {
            input.addEventListener("input", updateCustomization);
        });

        document.querySelectorAll(".custom-image").forEach(input => {
            input.addEventListener("change", updateImage);
        });

        let confirmButton = document.getElementById("confirm-purchase");
        if (confirmButton) {
            confirmButton.addEventListener("click", confirmPurchase);
        }
    }

    function updateCustomization(event) {
        let index = event.target.getAttribute("data-index");
        let cartItems = JSON.parse(localStorage.getItem("cart"));
        cartItems[index].customization = event.target.value;
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    function updateImage(event) {
        let index = event.target.getAttribute("data-index");
        let file = event.target.files[0];

        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let cartItems = JSON.parse(localStorage.getItem("cart"));
                cartItems[index].imageUpload = e.target.result;
                localStorage.setItem("cart", JSON.stringify(cartItems));
                loadCartItems();
            };
            reader.readAsDataURL(file);
        }
    }

    function updateQuantity(event) {
        let index = event.target.getAttribute("data-index");
        let newQuantity = parseInt(event.target.value);
        let cartItems = JSON.parse(localStorage.getItem("cart"));

        if (newQuantity < 1) {
            newQuantity = 1;
            event.target.value = 1;
        }

        cartItems[index].quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        loadCartItems();
    }

    function removeItem(event) {
        event.preventDefault();
        let index = event.target.closest("a").getAttribute("data-index");
        let cartItems = JSON.parse(localStorage.getItem("cart"));

        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        loadCartItems();
    }

    function confirmPurchase() {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        let loggedInUser = localStorage.getItem("loggedInUser");
    
        if (cartItems.length === 0) {
            alert("Your cart is empty! Please add items before proceeding.");
            return;
        }
    
        if (!loggedInUser) {
            alert("You must log in before confirming your order.");
            window.location.href = "loginpage.html"; // Redirect to login page
            return;
        }
    
        let confirmation = confirm("Are you sure you want to proceed with the purchase?");
        if (confirmation) {
            // Redirect to address form page
            window.location.href = "address.html";
        }
    }
});

// Fix Login/Logout Button in Navbar
document.addEventListener("DOMContentLoaded", function () {
    let loginLogoutLink = document.getElementById("login-logout");

    if (loginLogoutLink) {
        let loggedInUser = localStorage.getItem("loggedInUser");

        if (loggedInUser) {
            loginLogoutLink.innerHTML = "Logout";
            loginLogoutLink.href = "#";
            loginLogoutLink.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent default link behavior
                localStorage.removeItem("loggedInUser"); // Remove session
                alert("You have been logged out.");
                window.location.href = "index.html"; // Redirect to home
            });
        } else {
            loginLogoutLink.innerHTML = "Login";
            loginLogoutLink.href = "loginpage.html"; // Redirect to login page
        }
    }
});
