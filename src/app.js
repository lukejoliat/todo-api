import express from 'express';
import cors from 'cors';
import router, { errorHandler } from './routes/routes';

const app = express(); // an instance of express
app
  .use(cors())
  .use(router)
  .use(errorHandler);

export default app;
