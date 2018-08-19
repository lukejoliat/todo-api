import express from 'express';
import { db } from '../config/config';
import User from '../models/User';
const router = express.Router();

router.get('/', (req, res, next) => {
  const usersRef = db.collection('users');
  usersRef
    .get()
    .then(snapshot => {
      const results = [];
      snapshot.forEach(x => results.push(new User(x.data())));
      if (results) {
        res.status(200).json(results.filter(f => !f.invalid));
      } else {
        res.status(200).json([]);
      }
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const usersRef = db
    .collection('users')
    .doc(req.params.id || null)
    .get()
    .then(doc => {
      if (!doc.exists) {
        res.status(400).json({ message: 'No user found!' });
      } else {
        res.status(200).json(doc.data());
      }
    })
    .catch(next);
});

router.post('/create', (req, res, next) => {
  const data = new User(req.body);
  if (!data.invalid) {
    const setDoc = db
      .collection('users')
      .doc(req.body.first)
      .set(JSON.parse(JSON.stringify(data)))
      .then(response => res.status(200).json(response))
      .catch(next);
  } else {
    res.status(500).json({ message: 'missing required fields' });
  }
});

export default router;
