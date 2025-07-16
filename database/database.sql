-- Proyecto de Programación III
-- Desarrollado por Jeremias Geminiani
-- 15/05/2025

-- Crear la tabla Usuarios
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Crear la tabla Portafolio
CREATE TABLE IF NOT EXISTS Portfolio (
  id SERIAL PRIMARY KEY,
  userid INTEGER NOT NULL,
  image TEXT,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  technologies VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  is_public INT NOT NULL DEFAULT 0
);

