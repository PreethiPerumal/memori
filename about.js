document.addEventListener("DOMContentLoaded", function () {
    let loginLogoutLink = document.getElementById("login-logout");

    if (loginLogoutLink) {
        let loggedInUser = localStorage.getItem("loggedInUser");

        if (loggedInUser) {
            loginLogoutLink.innerHTML = "Logout";
            loginLogoutLink.href = "#";
            loginLogoutLink.addEventListener("click", function (event) {
                event.preventDefault(); 
                localStorage.removeItem("loggedInUser"); 
                alert("You have been logged out.");
                window.location.href = "index.html"; 
            });
        } else {
            loginLogoutLink.innerHTML = "Login";
            loginLogoutLink.href = "loginpage.html"; 
        }
    }
});
