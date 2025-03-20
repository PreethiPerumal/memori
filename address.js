document.getElementById("addressForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let userDetails = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        postal: document.getElementById("postal").value,
    };

    localStorage.setItem("userAddress", JSON.stringify(userDetails));

    alert("Your order has been placed successfully!");
    
    // Redirect to the thank you page
    window.location.href = "thankyou.html";
});
