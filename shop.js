document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".add-to-cart");

    cartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            
            let product = this.closest(".product");
            let name = product.querySelector(".product-name").innerText;
            let price = product.querySelector(".product-price").innerText.replace("₹", "");
            let image = product.querySelector("img").src;

            let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

            let existingProduct = cartItems.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cartItems.push({ name, price, image, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cartItems));
            alert("Product added to cart!");
        });
    });
});

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
