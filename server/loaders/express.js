import express from 'express';
import cors from 'cors';
import expressRouter from './routes/index';
import {
  handleErrors
} from '../middleware/errorHandeling';

export default async ({
  app
}) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));

  app.use(express.urlencoded({
    extended: true
  }));
  app.use('/', expressRouter);
  app.use(handleErrors)
  app.enable('trust proxy');
  app.use(require('morgan')('dev'));

  return app;
};