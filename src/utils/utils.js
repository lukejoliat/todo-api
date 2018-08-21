import { validationResult } from 'express-validator/check';

export default {
  failIfInvalid: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return next();
  },
  isAuthenticated: (req, res, next) => {
    const user = { isAuthenticated: false };
    if (user.isAuthenticated) {
      next();
    } else {
      next(new Error('not authenticated'));
    }
  },
};
