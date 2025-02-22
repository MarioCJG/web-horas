document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("errorMsg").innerText = data.error;
    }
});
