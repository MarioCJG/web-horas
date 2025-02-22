document.addEventListener("DOMContentLoaded", () => {
    cargarConsultores();
    cargarClientes();
    cargarHorasExtras();
});

// 🚀 Cargar Consultores en la tabla
async function cargarConsultores() {
    const response = await fetch("http://localhost:4000/api/consultores");
    const consultores = await response.json();
    const tbody = document.querySelector("#tablaConsultores tbody");
    tbody.innerHTML = "";

    consultores.forEach(consultor => {
        const row = `
            <tr>
                <td>${consultor.nombre}</td>
                <td>${consultor.apellido}</td>
                <td>${consultor.correo}</td>
                <td>${consultor.area}</td>
                <td>
                    <button onclick="editarConsultor(${consultor.id_consultor})">✏️</button>
                    <button onclick="eliminarConsultor(${consultor.id_consultor})">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// 🚀 Cargar Clientes en la tabla
async function cargarClientes() {
    const response = await fetch("http://localhost:4000/api/clientes");
    const clientes = await response.json();
    const tbody = document.querySelector("#tablaClientes tbody");
    tbody.innerHTML = "";

    clientes.forEach(cliente => {
        const row = `
            <tr>
                <td>${cliente.nombre_cli}</td>
                <td>${cliente.apellido_cli}</td>
                <td>${cliente.correo_cli}</td>
                <td>${cliente.mon_empresa}</td>
                <td>
                    <button onclick="editarCliente(${cliente.id_cliente})">✏️</button>
                    <button onclick="eliminarCliente(${cliente.id_cliente})">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// 🚀 Cargar Horas Extras en la tabla
async function cargarHorasExtras() {
    const response = await fetch("http://localhost:4000/api/historial");
    const horas = await response.json();
    const tbody = document.querySelector("#tablaHoras tbody");
    tbody.innerHTML = "";

    horas.forEach(hora => {
        const row = `
            <tr>
                <td>${hora.consultor}</td>
                <td>${hora.cliente}</td>
                <td>${hora.fecha_inicio}</td>
                <td>${hora.hora_inicio}</td>
                <td>${hora.fecha_termino}</td>
                <td>${hora.hora_termino}</td>
                <td>${hora.horas}</td>
                <td>
                    <button onclick="editarHoras(${hora.id})">✏️</button>
                    <button onclick="eliminarHoras(${hora.id})">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

