document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ horas.js cargado correctamente");
    cargarConsultores();
    cargarClientes();
    agregarEventosCalculoHoras();
});

console.log("✅ horas.js se está ejecutando correctamente");

// 🔹 Cargar Consultores desde la API
function cargarConsultores() {
    console.log("🔄 Cargando consultores desde la API...");
    fetch("http://localhost:4000/api/consultores")
        .then(response => response.json())
        .then(data => {
            console.log("✅ Consultores recibidos:", data);
            const select = document.getElementById("consultor");
            select.innerHTML = "<option value=''>Seleccione un consultor</option>";
            data.forEach(consultor => {
                console.log(`➕ Agregando consultor: ${consultor.nombre} ${consultor.apellido}`);
                let option = document.createElement("option");
                option.value = consultor.id_consultor;
                option.textContent = `${consultor.nombre} ${consultor.apellido}`;
                select.appendChild(option);
            });
        })
        .catch(error => console.error("❌ Error cargando consultores:", error));
}

// 🔹 Cargar Clientes desde la API
function cargarClientes() {
    console.log("🔄 Cargando clientes desde la API...");
    fetch("http://localhost:4000/api/clientes")
        .then(response => response.json())
        .then(data => {
            console.log("✅ Clientes recibidos:", data);
            const select = document.getElementById("cliente");
            select.innerHTML = "<option value=''>Seleccione un cliente</option>";
            data.forEach(cliente => {
                console.log(`➕ Agregando cliente: ${cliente.nombre_cli} ${cliente.apellido_cli}`);
                let option = document.createElement("option");
                option.value = cliente.id_cliente;
                option.textContent = `${cliente.nombre_cli} ${cliente.apellido_cli}`;
                select.appendChild(option);
            });
        })
        .catch(error => console.error("❌ Error cargando clientes:", error));
}

// 🔹 Calcular Horas Automáticamente
function agregarEventosCalculoHoras() {
    const horaInicioInput = document.getElementById("hora_inicio");
    const horaTerminoInput = document.getElementById("hora_termino");
    const totalHorasInput = document.getElementById("horas");

    function calcularDiferenciaHoras() {
        const horaInicio = horaInicioInput.value;
        const horaTermino = horaTerminoInput.value;

        console.log(`⏰ Hora inicio: ${horaInicio}, Hora término: ${horaTermino}`);

        if (horaInicio && horaTermino) {
            const [hInicio, mInicio] = horaInicio.split(":").map(Number);
            const [hTermino, mTermino] = horaTermino.split(":").map(Number);

            let minutosInicio = hInicio * 60 + mInicio;
            let minutosTermino = hTermino * 60 + mTermino;
            let diferenciaMinutos = minutosTermino - minutosInicio;

            if (diferenciaMinutos < 0) {
                diferenciaMinutos += 24 * 60; // Ajuste para horas después de medianoche
            }

            const horas = Math.floor(diferenciaMinutos / 60); // Horas completas
            const minutos = diferenciaMinutos % 60; // Minutos restantes

            // 🔹 Representamos en formato HH:MM
            const horasFinales = `${horas}:${minutos.toString().padStart(2, "0")}`;

            totalHorasInput.value = horasFinales;
            console.log(`✅ Total de horas calculado correctamente: ${horasFinales}`);
        } else {
            totalHorasInput.value = "";
            console.log("⚠️ No se han seleccionado ambas horas");
        }
    }

    horaInicioInput.addEventListener("change", calcularDiferenciaHoras);
    horaTerminoInput.addEventListener("change", calcularDiferenciaHoras);
}




// 🔹 Enviar Datos al Servidor
document.getElementById("horasForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const data = {
        consultor_id: document.getElementById("consultor").value,
        cliente_id: document.getElementById("cliente").value,
        fecha_inicio: document.getElementById("fecha_inicio").value,
        hora_inicio: document.getElementById("hora_inicio").value,
        fecha_termino: document.getElementById("fecha_termino").value,
        hora_termino: document.getElementById("hora_termino").value,
        horas: document.getElementById("horas").value
    };

    fetch("http://localhost:4000/api/horas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById("mensaje").textContent = result.message;
        document.getElementById("horasForm").reset();
    })
    .catch(error => console.error("Error al registrar horas:", error));
});
