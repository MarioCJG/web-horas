const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const router = express.Router();

router.post("/login", async (req, res) => {
    const { correo, password } = req.body;
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);
        if (rows.length === 0) return res.status(401).json({ error: "Usuario no encontrado" });

        const usuario = rows[0];
        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) return res.status(401).json({ error: "Contraseña incorrecta" });

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, usuario });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

module.exports = router;
