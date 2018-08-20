import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import UserRoutes from './routes-user';
import TodoRoutes from './routes-todo';
const router = express.Router();
router
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use('/users', UserRoutes)
  .use('/todos', TodoRoutes);

// Server index.html page when request to the root is made
router.get('/', (req, res, next) => res.sendfile('./public/index.html'));

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Something broke!' });
};

export { errorHandler };

export default router;
