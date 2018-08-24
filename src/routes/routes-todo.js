import express from 'express';
import { check } from 'express-validator/check';
import Todo from '../models/Todo';
import utils from '../utils/utils';
import { db } from '../firebase/firebase';

const router = express.Router();

/**
 * Get all Todos
 */
router.get('/', (req, res, next) => {
  const docRef = db.collection('todos');
  docRef
    .get()
    .then((snapshot) => {
      const results = [];
      snapshot.forEach(x => results.push(x.data()));
      if (results.length) res.status(200).json(results);
      else res.status(200).json([]);
    })
    .catch(next);
});

/**
 * Get Todo by ID
 */
router.get(
  '/:id',
  [
    check('id')
      .exists()
      .withMessage('must be provided'),
  ],
  utils.failIfInvalid,
  (req, res, next) => {
    const { id } = req.params;
    db.collection('todos')
      .doc(req.params.id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          res.status(404).json({ message: `Todo with id: ${id} does not exist!` });
        } else {
          res.status(200).json(doc.data());
        }
      })
      .catch(next);
  },
);

/**
 * Create Todo
 */
router.post(
  '/create',
  [
    check('title')
      .exists()
      .withMessage('must be provided')
      .isString()
      .withMessage('must be a string'),
    check('complete')
      .exists()
      .withMessage('must be provided')
      .isBoolean()
      .withMessage('must be a boolean'),
  ],
  utils.failIfInvalid,
  (req, res, next) => {
    const data = new Todo(req.body);
    if (!data.invalid) {
      db.collection('todos')
        .add(JSON.parse(JSON.stringify(data)))
        .then(response => res.status(200).json({ message: `created: ${response.id}.` }))
        .catch(next);
    } else {
      res.status(500).json({ message: 'invalid payload' });
    }
  },
);

/**
 * Delete Todo
 */
router.delete(
  '/delete/:id',
  check('id')
    .exists()
    .withMessage('must be provided'),
  utils.failIfInvalid,
  (req, res, next) => {
    const { id } = req.params;
    const docRef = db.collection('todos').doc(id);
    docRef
      .delete()
      .then(() => res.status(200).json({ message: `deleted: ${docRef.id}.` }))
      .catch(next);
  },
);

/**
 * Update existing Todo
 */
router.patch(
  '/update/:id',
  [
    check('id').exists(),
    check('title')
      .exists()
      .withMessage('must be provided')
      .isString()
      .withMessage('must be a string'),
    check('complete')
      .exists()
      .withMessage('must be provided')
      .isBoolean()
      .withMessage('must be a boolean'),
  ],
  utils.failIfInvalid,
  (req, res, next) => {
    const { id } = req.params;
    const { title, complete } = req.body;
    const docRef = db.collection('todos').doc(id);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = new Todo({
            title,
            complete,
          });
          if (!data.invalid) {
            docRef
              .update(JSON.parse(JSON.stringify(data)))
              .then(() => res.status(200).json({ message: `updated: ${docRef.id}.` }))
              .catch(next);
          } else {
            res.status(500).json({ message: 'invalid payload' });
          }
        } else {
          res.status(404).json({ message: `Todo with id: ${id} does not exist!` });
        }
      })
      .catch(next);
  },
);

export default router;
