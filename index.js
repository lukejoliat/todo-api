import express from 'express';
import cors from 'cors';
import router, { errorHandler } from './routes/routes';
import config from './config/config';

const app = express(); // an instance of express
const PORT = config.port || 3000;
app
  .use(cors())
  .use(router)
  .use(errorHandler)
  .listen(PORT, () => {
    console.log(`Express server listening on ports ${PORT}`);
  });
