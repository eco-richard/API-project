const express = require('express');
const router = express.Router();

const { Spot, Review, SpotImage, User } = require('../../db/models');

const Sequelize = require("sequelize");

// Spot not found error object
const spotNotFound = {
    "message": "Spot couldn't be found",
    "statusCode": 404
}

// Function to find the average rating for a spot
async function findAverageRating(spot) {

    // Get all reveiws for the given spot
    const reviews = await Review.findAll({
        where: {
            spotId: spot.id
        }
    })

    // Find the sum of all reviews
    let sum = 0;
    reviews.forEach(review => {
        sum += review.stars;
    })

    // Return average
    return sum / reviews.length;
}

// GET all spots
router.get('/', async (_req, res) => {
    const spots = await Spot.findAll();

    const spotsArray = [];
    spots.forEach(spot => {
        spotsArray.push(spot.toJSON());
    })

    const avgRating = findAverageRating(spot);
    return res.json({
        ...spots,
        "avgRating": `${avgRating}`
    });
});

// GET specific spot by id
router.get('/:spotId', async (req, res) => {
    // Find spot by its primary key from the parameter
    let spot = await Spot.findByPk(req.params.spotId, {
        // Along with spot, include the spot images and owner details
        include: [
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            },
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            }
        ]
    })

    // If no spot exists, return 404 error
    if (!spot) {
        res.status(404);
        res.json(spotNotFound);
    }

    spot = spot.toJSON();
    spot.numReviews = spot.Reviews.length;
    spot.Owner = spot.User;

    res.json(spot);
})

module.exports = router;
