const express = require('express');
const router = express.Router();

const { Review, Spot, SpotImage, ReviewImage, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

// const { findAverageRating, findPreviewImg } = require('./spots.js');
// Find the preview image for a given spot
async function findPreviewImg(spot) {
    // Get spot images which are previews from SpotImage database
    const previewImg = await SpotImage.findOne({
        where: {
            preview: true,
            spotId: spot.id
        }
    })

    // return preview instance
    return previewImg;
}


const Sequelize = require('sequelize');

// GET all review of the current user

router.get("/current", requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        }
    })

    const reviewArray = [];
    reviews.forEach(review => {
        reviewArray.push(review.toJSON());
    })

    for (const review of reviewArray) {
        const user = await User.findOne({
            where: {
                id: review.userId
            },
            attributes: ["id", "firstName", "lastName"]
        })

        let spot = await Spot.findOne({
            where: {
                id: review.spotId
            },
            attributes: [
                "id",
                "ownerId",
                "address",
                "city",
                "state",
                "country",
                "lat",
                "lng",
                "name",
                "price"
            ]
        })

        spot = spot.toJSON;
        const previewImg = await findPreviewImg(spot);
        spot.previewImage = previewImg.url;

        const reviewImg = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            attributes: ["id", "url"]
        })

        review.User = user;
        review.Spot = spot;
        review.ReviewImages = reviewImg
    }

    res.json({"Reviews": reviewArray})
})

// Add an image to a review based on the review id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
    const { url } = req.body;

    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    const images = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })
    if (images && images.length > 10) {
        console.log("Error");
    }

    let newImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    });
    newImage = newImage.toJSON();

    delete newImage.reviewId;
    delete newImage.createdAt;
    delete newImage.updatedAt;

    res.json(newImage);
})

// Edit a review
router.put("/:reviewId", requireAuth, async (req, res) => {
    const { review, stars } = req.body;

    if (!review) {
        console.log('Error');
    }
    if (!stars || stars > 5 || stars < 1) {
        console.log("Error");
    }

    const currentReview = await Review.findByPk(req.params.reviewId);

    if (!currentReview) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    currentReview.update({
        review,
        stars
    })

    res.json(currentReview);
})

// Delete a review
router.delete("/:reviewId", requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        res.status(404);
        res.json({
            "message": "Review couldn't found",
            "statusCode": 404
        })
    }

    await review.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router
