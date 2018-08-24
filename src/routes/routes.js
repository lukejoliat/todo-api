import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import utils from '../utils/utils';
import TodoRoutes from './routes-todo';

const router = new express.Router();
router
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(utils.isAuthenticated)
  .use('/todos', TodoRoutes);

// Server index.html page when request to the root is made
router.get('/', (req, res) => res.sendfile('./public/index.html'));

const errorHandler = ({ status, message }, req, res, next) => {
  res.status(status || 500).json({ message: message || 'Something broke!' });
  next();
};

export { errorHandler };

export default router;
