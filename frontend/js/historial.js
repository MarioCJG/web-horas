function cargarHistorial() {
    console.log("📜 Cargando historial...");
    
    fetch("http://localhost:4000/api/historial")
        .then(response => response.json())
        .then(data => {
            console.log("✅ Datos recibidos:", data);
            const tabla = document.querySelector("#historial-body");
            tabla.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

            data.forEach(item => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${item.consultor}</td>
                    <td>${item.cliente}</td>
                    <td>${item.fecha_inicio.split("T")[0]}</td>
                    <td>${item.hora_inicio}</td>
                    <td>${item.fecha_termino.split("T")[0]}</td>
                    <td>${item.hora_termino}</td>
                    <td>${item.horas}</td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(error => console.error("❌ Error al cargar historial:", error));
}

// Ejecutar solo si estamos en la página de historial
if (document.querySelector("#historial-table")) {
    cargarHistorial();
}
