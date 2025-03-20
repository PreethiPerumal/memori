document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent.`);
        this.reset();
    } else {
        alert("Please fill out all fields.");
    }
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
