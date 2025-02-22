const express = require("express");
const pool = require("../db");
const router = express.Router();

// Obtener todas las horas extras
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT h.id, c.nombre AS consultor, cl.nombre_cli AS cliente, 
                   h.fecha_inicio, h.hora_inicio, h.fecha_termino, h.hora_termino, h.horas
            FROM horas_extras h
            JOIN consultores c ON h.consultor_id = c.id_consultor
            JOIN clientes cl ON h.cliente_id = cl.id_cliente
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

// Registrar nuevas horas extras
router.post("/", async (req, res) => {
    const { consultor_id, cliente_id, fecha_inicio, hora_inicio, fecha_termino, hora_termino, horas } = req.body;

    try {
        const query = `
            INSERT INTO horas_extras (consultor_id, cliente_id, fecha_inicio, hora_inicio, fecha_termino, hora_termino, horas)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await pool.query(query, [consultor_id, cliente_id, fecha_inicio, hora_inicio, fecha_termino, hora_termino, horas]);

        res.json({ message: "Horas extras registradas con éxito!" });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

module.exports = router;
