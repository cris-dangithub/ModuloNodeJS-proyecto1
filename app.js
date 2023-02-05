require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

server.listen();

// Lista de cosas por hacer
/*
  *1. Implementación de manejo de errores
  *2. Implementación de manejo de estados success
  3. Encriptación de contraseñas (resetear DB)
  4. Generación de tokens para los usuarios
  5. Elegir las rutas protegidas con el token y las no protegidas
  6. Todas las validaciones necesarias con respecto a tokens y usuarios en sesión

*/