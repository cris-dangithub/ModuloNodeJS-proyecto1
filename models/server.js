const express = require('express');
const cors = require('cors');
const { usersRouter } = require('../routes/users.routes');
const { transfersRouter } = require('../routes/transfers.routes');
const { db } = require('../database/db');
const morgan = require('morgan');
const AppError = require('../utils/appError');
const { globalErrorHandler } = require('../controllers/error.controller');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT; //|| 4000;
    this.paths = {
      users: '/api/v1/users',
      transfers: '/api/v1/transfers',
    };

    this.database();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.transfers, transfersRouter);
    // Manejo de errores
    this.app.use('*', (req, res, next) => {
      const message = `The url ${req.originalUrl} does not exists in this server`;
      next(new AppError(message, 404));
    });
    this.app.use(globalErrorHandler);
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    this.app.use(cors());
    this.app.use(express.json());
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));
    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor creado exitosamente en puerto ${this.port}`);
    });
  }
}
module.exports = Server;
