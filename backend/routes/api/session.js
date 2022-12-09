const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

// Login endpoint
router.post(
    '/',
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        res.status(401);
        res.json({
          "message": "Invalid credentials",
          "statusCode": 401
        })
      }

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      const token = await setTokenCookie(res, user);

      return res.json({ "user": {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        token }
      });
    }
);

router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);

// Get current user endpoint
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json(
          {"user": user.toSafeObject()}
        );
      } else return res.json({
        "user": null
      });
    }
);

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
];

// router.post(
//     '/',
//     validateLogin,
//     async (req, res, next) => {
//       const { credential, password } = req.body;

//       const user = await User.login({ credential, password });

//       // if (!user) {
//       //   const err = new Error('Login failed');
//       //   err.status = 401;
//       //   err.title = 'Login failed';
//       //   err.errors = ['The provided credentials were invalid.'];
//       //   return next(err);
//       // }



//       await setTokenCookie(res, user);

//       return res.json(user);
//     }
// );

module.exports = router;
