const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click',() => {
    container.classList.add('active');
});

loginBtn.addEventListener('click',() => {
    container.classList.remove('active');
});



// const bar = document.getElementById('bar');
// const nav = document.getElementById('navbar');

// if (bar) {
//     bar.addEventListener('click', () => {
//         nav.classList.add('active');
//     });
// }

document.addEventListener("DOMContentLoaded", function () {
    const bar = document.getElementById('bar');
    const nav = document.getElementById('navbar');

    if (bar && nav) {
        bar.addEventListener('click', () => {
            nav.classList.toggle('active'); 
        });
    } else {
        console.error("Error: Navbar or bar not found in the DOM.");
    }
});


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
    let loggedInUser = localStorage.getItem("loggedInUser");
    let loginLogoutLink = document.getElementById("login-logout");

    if (loggedInUser) {
        loginLogoutLink.innerHTML = "Logout";
        loginLogoutLink.href = "#";
        loginLogoutLink.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            alert("You have been logged out.");
            window.location.href = "index.html";
        });
    } else {
        loginLogoutLink.innerHTML = "Login";
        loginLogoutLink.href = "loginpage.html"; // Redirect to login page
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector(".register form");
    const loginForm = document.querySelector(".login form");

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = registerForm.querySelector("input[type='text']").value;
            let email = registerForm.querySelector("input[type='email']").value;
            let password = registerForm.querySelector("input[type='password']").value;

            if (!username || !email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            // Check if email is already registered
            if (localStorage.getItem(email)) {
                alert("This email is already registered. Try logging in!");
                return;
            }

            // Save user details in Local Storage
            let userData = { username, email, password };
            localStorage.setItem(email, JSON.stringify(userData));

            alert("Registration successful! Please log in.");
            window.location.href = "loginpage.html"; // Redirect to login page
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let email = loginForm.querySelector("input[type='email']").value;
            let password = loginForm.querySelector("input[type='password']").value;

            if (!email || !password) {
                alert("Please enter your email and password.");
                return;
            }

            let storedUser = localStorage.getItem(email);
            if (!storedUser) {
                alert("User not found. Please register first.");
                return;
            }

            let userData = JSON.parse(storedUser);
            if (userData.password !== password) {
                alert("Incorrect password. Try again!");
                return;
            }

            // Store login status & redirect to cart
            localStorage.setItem("loggedInUser", email);
            alert("Login successful!");
            window.location.href = "cart.html"; // Redirect to cart after login
        });
    }

    // Handle Navbar Login/Logout Button
    let loginLogoutLink = document.getElementById("login-logout");
    if (loginLogoutLink) {
        let loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            loginLogoutLink.innerHTML = "Logout";
            loginLogoutLink.href = "#";
            loginLogoutLink.addEventListener("click", function () {
                localStorage.removeItem("loggedInUser");
                alert("You have been logged out.");
                window.location.href = "index.html";
            });
        } else {
            loginLogoutLink.innerHTML = "Login";
            loginLogoutLink.href = "loginpage.html"; // Redirect to login page
        }
    }
});


