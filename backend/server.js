require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const horasRoutes = require("./routes/horas");
const consultoresRoutes = require("./routes/consultores");
const clientesRoutes = require("./routes/clientes");
const historialRoutes = require("./routes/historial");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Servir archivos estáticos desde `frontend/`
app.use(express.static(path.join(__dirname, "../frontend")));

// 🔹 Ruta para manejar cualquier petición a "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/horas", horasRoutes);
app.use("/api/consultores", consultoresRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/historial", historialRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`));
