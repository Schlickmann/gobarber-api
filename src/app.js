import express from 'express';
import { resolve } from 'path';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

import 'express-async-errors';

import routes from './routes';

import './database';

require('dotenv').config();

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // The request handler must be the first middleware on the app
    this.server.use(Sentry.Handlers.requestHandler());

    this.server.use(express.json());
    // serving static images
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);

    // The error handler must be before any other error middleware and after all controllers
    this.server.use(Sentry.Handlers.errorHandler());
  }
}

export default new App().server;
