CREATE DATABASE IF NOT EXISTS web_timer;
USE web_timer;

-- Tabla de Usuarios (para autenticación)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tabla de Consultores
CREATE TABLE IF NOT EXISTS consultores (
    id_consultor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    numero VARCHAR(15),
    area VARCHAR(50)
);

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cli VARCHAR(50) NOT NULL,
    apellido_cli VARCHAR(50) NOT NULL,
    correo_cli VARCHAR(100) UNIQUE NOT NULL,
    numero_cli VARCHAR(15),
    mon_empresa VARCHAR(100)
);

-- Tabla de Horas Extras
CREATE TABLE IF NOT EXISTS horas_extras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    consultor_id INT NOT NULL,
    cliente_id INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    fecha_termino DATE NOT NULL,
    hora_termino TIME NOT NULL,
    horas DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (consultor_id) REFERENCES consultores(id_consultor),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id_cliente)
);
