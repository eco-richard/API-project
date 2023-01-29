const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking } = require('../../db/models');

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

// Get all users
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

// Get Details of User (Spots, Reviews, Bookings)
router.get(
  `/user-details/:userId`,
  async (req, res) => {
    // Get user details from the id:
    let user = await User.findByPk(req.params.userId);

    if (!user) {
      res.status(404);
      return res.json({
        message: "User could not be found",
        statusCode: 404
      })     
    }
    user = user.toJSON();
    // user.Spots = [];
    // user.Reviews = [];
    // user.Bookings = [];
    // let userSpots = await Spot.findAll({
    //   where: {
    //     ownerId: user.id
    //   }
    // })
    // userSpots.forEach(spot => {
    //   user.Spots.push(spot.toJSON());
    // })

    res.status(200);
    return res.json({"User": user}); 
  }
)

module.exports = router;
