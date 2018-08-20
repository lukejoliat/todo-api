import express from 'express';
import cors from 'cors';
import router, { errorHandler } from './src/routes/routes';
import config from './src/config/config';

const app = express(); // an instance of express
const PORT = config.port || 3000;
app
  .use(cors())
  .use(router)
  .use(errorHandler)
  .listen(PORT, () => {
    console.log(`Express server listening on ports ${PORT}`);
  });
