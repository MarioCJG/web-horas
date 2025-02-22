const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM consultores");
        res.json(rows);
    } catch (error) {
        console.error("Error obteniendo consultores:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

module.exports = router;
