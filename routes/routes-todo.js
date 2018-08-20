import express from 'express';
import { db } from '../config/config';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('All Todos.');
});

export default router;
