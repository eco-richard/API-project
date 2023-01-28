const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post(
    '/',
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;

      const potentialUserEmail = await User.findOne({
        where: {
          email: email
        }
      })

      const potentialUserUsername = await User.findOne({
        where: {
          username: username
        }
      })

      if (potentialUserEmail) {
        res.status(403);
        res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
      }

      if (potentialUserUsername) {
        res.status(403);
        res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "username": "User with that username already exists"
          }
        })
      }

      let user = await User.signup({ firstName, lastName, email, username, password });

      const token = await setTokenCookie(res, user);

      user = user.toJSON();
      user.token = token;

      delete user.createdAt;
      delete user.updatedAt;

      return res.json({"user": user});
    }
);

router.get(
  `/all-users`,
  async (req, res) => {
    const usersResponse = await User.findAll();

    const users = [];
    usersResponse.forEach(user => {
      users.push(user.toJSON())
    })
    console.log("Users: ", users);
    return res.json({"Users": users})
  }
);

module.exports = router;
