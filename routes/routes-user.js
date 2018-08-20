import express from 'express';
import { db } from '../config/config';
import User from '../models/User';
import { check } from 'express-validator/check';
import utils from '../utils/utils';
const router = express.Router();

/**
 * Get all Users
 */
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

/**
 * Get User by ID
 */
router.get(
  '/:id',
  [
    check('id')
      .exists()
      .withMessage('must be provided')
  ],
  utils.failIfInvalid,
  (req, res, next) => {
    const id = req.params.id;
    db.collection('users')
      .doc(req.params.id)
      .get()
      .then(doc => {
        if (!doc.exists) {
          res
            .status(404)
            .json({ message: `User with id: ${id} does not exist!` });
        } else {
          res.status(200).json(doc.data());
        }
      })
      .catch(next);
  }
);

/**
 * Create User
 */
router.post('/create', (req, res, next) => {
  const data = new User(req.body);
  if (!data.invalid) {
    db.collection('users')
      .add(JSON.parse(JSON.stringify(data)))
      .then(response =>
        res.status(200).json({ message: `created: ${response.id}.` })
      )
      .catch(next);
  } else {
    res.status(500).json({ message: `invalid payload` });
  }
});

/**
 * Delete User
 */
router.delete(
  '/delete/:id',
  check('id')
    .exists()
    .withMessage('must be provided'),
  utils.failIfInvalid,
  (req, res, next) => {
    const id = req.params.id,
      userRef = db.collection('users').doc(id);
    userRef
      .delete()
      .then(response =>
        res.status(200).json({ message: `deleted: ${userRef.id}.` })
      )
      .catch(next);
  }
);

/**
 * Update existing User
 */
router.patch(
  '/update/:id',
  [
    check('id').exists(),
    check('first')
      .exists()
      .withMessage('must be provided')
      .isString()
      .withMessage('must be a string'),
    check('last')
      .exists()
      .withMessage('must be provided')
      .isString()
      .withMessage('must be a string')
  ],
  utils.failIfInvalid,
  (req, res, next) => {
    const id = req.params.id,
      { first, last } = req.body,
      userRef = db.collection('users').doc(id);
    userRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = new User({
            first: first,
            last: last
          });
          if (!data.invalid) {
            userRef
              .update(JSON.parse(JSON.stringify(data)))
              .then(response =>
                res.status(200).json({ message: `updated: ${userRef.id}.` })
              )
              .catch(next);
          } else {
            res.status(500).json({ message: `invalid payload` });
          }
        } else {
          res
            .status(404)
            .json({ message: `User with id: ${id} does not exist!` });
        }
      })
      .catch(next);
  }
);

export default router;
