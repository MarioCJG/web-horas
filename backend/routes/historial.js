const express = require("express");
const router = express.Router();
const pool = require("../db");

// Obtener historial con nombres de consultores y clientes
router.get("/", async (req, res) => {
    try {
        const query = `
            SELECT 
                h.id,
                CONCAT(c.nombre, ' ', c.apellido) AS consultor,
                CONCAT(cli.nombre_cli, ' ', cli.apellido_cli) AS cliente,
                h.fecha_inicio,
                h.hora_inicio,
                h.fecha_termino,
                h.hora_termino,
                h.horas
            FROM horas_extras h
            JOIN consultores c ON h.consultor_id = c.id_consultor
            JOIN clientes cli ON h.cliente_id = cli.id_cliente
            ORDER BY h.fecha_inicio DESC;
        `;

        const [result] = await pool.query(query);
        res.json(result);
    } catch (error) {
        console.error("❌ Error obteniendo historial:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

module.exports = router;
