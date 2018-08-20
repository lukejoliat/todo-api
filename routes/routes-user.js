import express from 'express';
import { db } from '../config/config';
import User from '../models/User';
const router = express.Router();
// no validation
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

// validate id is in payload
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  db.collection('users')
    .doc(req.params.id)
    .get()
    .then(doc => {
      if (!doc.exists) {
        res.status(400).json({ message: `No user found with id: ${id}!` });
      } else {
        res.status(200).json(doc.data());
      }
    })
    .catch(next);
});

// validate structure of data
router.post('/create', (req, res, next) => {
  const data = new User(req.body);
  if (!data.invalid) {
    db.collection('users')
      .doc(req.body.first)
      .set(JSON.parse(JSON.stringify(data)))
      .then(response => res.status(200).json(response))
      .catch(next);
  } else {
    res.status(500).json({ message: 'invalid payload' });
  }
});

// validate id exists
router.delete('/delete/:id', (req, res, next) => {
  const id = req.params.id;
  db.collection('users')
    .doc(id)
    .delete()
    .then(response => res.status(200).json(response))
    .catch(next);
});

// validate field(s) is/are in model and of right data type
router.patch('/update/:id', (req, res, next) => {
  const id = req.params.id,
    { first, last } = req.body,
    userRef = db.collection('users').doc(id);
  userRef
    .get()
    .then(doc => {
      if (doc.exists) {
        const data = new User({
          first: first || doc.data().first,
          last: last || doc.data().last
        });
        if (!data.invalid) {
          userRef
            .update(JSON.parse(JSON.stringify(data)))
            .then(response => res.status(200).json(response))
            .catch(next);
        } else {
          res.status(500).json({ message: 'invalid payload' });
        }
      } else {
        res.status(500).json({ message: 'document does not exist' });
      }
    })
    .catch(next);
});

// failIfInvalid = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   } else {
//     next();
//   }
// };

export default router;
