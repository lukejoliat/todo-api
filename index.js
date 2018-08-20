import express from 'express';
import router, { errorHandler } from './routes/routes';
import config from './config/config';
import cors from 'cors';
const app = express(); // an instance of express
const PORT = config.port || 3000;
app
  .use(cors())
  .use(router)
  .use(errorHandler)
  .listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
  });
