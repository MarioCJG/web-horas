function loadPage(page) {
    const content = document.getElementById('content');
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;

            // 🔹 Si se carga ajustes.html, ejecutar ajustes.js manualmente
            if (page === "ajustes") {
                const script = document.createElement("script");
                script.src = "js/ajustes.js";
                script.onload = () => {
                    console.log("✅ ajustes.js cargado dinámicamente");
                    if (typeof cargarConsultores === "function") {
                        cargarConsultores();
                        cargarClientes();
                        cargarHorasExtras();
                    } else {
                        console.error("❌ cargarConsultores() no está definido");
                    }
                };
                document.body.appendChild(script);
            }
            
            if (page === "historial") {
                const script = document.createElement("script");
                script.src = "js/historial.js";
                script.onload = () => {
                    console.log("✅ historial.js cargado dinámicamente");
                    if (typeof cargarHistorial === "function") {
                        cargarHistorial();
                    } else {
                        console.error("❌ cargarHistorial() no está definido");
                    }
                };
                document.body.appendChild(script);
            }
            // 🔹 Si se carga horas.html, ejecutar horas.js manualmente
            if (page === "horas") {
                const script = document.createElement("script");
                script.src = "js/horas.js";
                script.onload = () => {
                    console.log("✅ horas.js cargado dinámicamente");
                    if (typeof cargarConsultores === "function") {
                        cargarConsultores();
                        cargarClientes();
                        // 🔹 Llamar la función después de que se cargue horas.js
                        if (typeof agregarEventosCalculoHoras === "function") {
                            agregarEventosCalculoHoras();
                        } else {
                            console.error("❌ agregarEventosCalculoHoras() no está definido");
                        }
                    } else {
                        console.error("❌ cargarConsultores() no está definido");
                    }
                };
                document.body.appendChild(script);
            }
        })
        .catch(error => console.error("Error cargando la página:", error));
}


function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

// Proteger la página si el usuario no está autenticado
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "index.html";
    }
});
