# 🎨 Canva - Aplicación en React


<div style="text-align: center;">
  <img src="./logo.png" alt="IMG" width="400" />
</div>

**Canva** es una aplicación web para crear, editar, eliminar y compartir portafolios básicos. Inspirado en [canva.com](https://canva.com), este proyecto busca ofrecer una herramienta sencilla y práctica para diseñadores, desarrolladores o cualquier usuario que desee mostrar su trabajo en línea.

---

## 🛠️ Funcionalidades

- ✅ Crear portafolios
- ✅ Editar portafolios
- ✅ Eliminar portafolios
- ✅ Compartir portafolios
- ✅ Filtrar por tecnología los portafolios

---

## 🧰 Tecnologías utilizadas

### 🔹 Frontend
- [React](https://www.npmjs.com/package/react)  
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  
- [react-icons](https://www.npmjs.com/package/react-icons)  
- [react-hook-form](https://www.npmjs.com/package/react-hook-form)  

### 🔸 Backend
- [express](https://www.npmjs.com/package/express)  
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)  
- [cors](https://www.npmjs.com/package/cors)  
- [sequelize](https://www.npmjs.com/package/sequelize)  
- [morgan](https://www.npmjs.com/package/morgan)  
- [helmet](https://www.npmjs.com/package/helmet)  
- [dotenv](https://www.npmjs.com/package/dotenv)  

### 🗃️ Base de datos
- [PostgreSQL](https://www.postgresql.org/)  

### ⚡ Cache
- [Redis](https://redis.io/)  

### 📦 Contenedores
- [Docker Compose](https://docs.docker.com/compose/)  

---

## 🚀 Iniciar el proyecto

```bash
sudo su
docker-compose build
docker-compose up -d
docker-compose logs -f
```

---

## 🌐 Puertos por defecto

| Servicio   | Dirección                |
|------------|--------------------------|
| Frontend   | http://localhost:3000    |
| Backend    | http://localhost:3001    |
| PgAdmin    | http://localhost:5050    |

---

## 🗄️ Base de datos

La base de datos se encuentra en el archivo:

```
/database/database.sql
```

---

## 🔐 Variables de entorno

Las variables de entorno necesarias están definidas en el archivo:

```
.env
```

---

## 👨‍💻 Integrantes del equipo

- Jeremias Geminiani
- Fu Te Ho
- Pablo Vittadini
- Ramiro Cutropia

---

## 📄 Licencia

Este proyecto es de uso académico y no está afiliado oficialmente a canva.com, simplemente es un proyecto universitario.