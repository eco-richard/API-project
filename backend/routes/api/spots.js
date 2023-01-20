const express = require('express');
const router = express.Router();

const { Spot, Review, ReviewImage, SpotImage, User, Booking } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const Sequelize = require("sequelize");
// const booking = require('../../db/models/booking');

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
        },
        attributes: ["stars"]
    })

    // Find the sum of all reviews
    let sum = 0;
    reviews.forEach(review => {
        sum += review.stars;
    })

    // Return average
    return sum / reviews.length;
}

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

// Get query filters
async function getQueryFilters(req) {
    const { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    const errors = {};
    const queryValidationErrorObj = {
        "message": "Validation Error",
        "statusCode": 400,
    }
    if (!page) page = 1;
    if (!size) size = 20;

    let pagination = {};
    if (parseInt(page) >= 1 && parseInt(page) <= 10 && parseInt(size) >= 1 && parseInt(size) <= 20) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    return pagination;
}

// GET all spots
router.get('/', async (req, res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    const errors = {};
    const queryValidationErrorObj = {
        "message": "Validation Error",
        "statusCode": 400,
        errors
    }
    if (!page) page = 1;
    if (!size) size = 20;

    if (Number.isNaN(minLat)) {
        errors.minLat = "Minimum latitude is invalid"
    }
    if (Number.isNaN(maxLat)) {
        errors.minLat = "Minimum latitude is invalid"
    }
    if (Number.isNaN(minLng)) {
        errors.minLat = "Minimum latitude is invalid"
    }
    if (Number.isNaN(maxLng)) {
        errors.minLat = "Minimum latitude is invalid"
    }
    if (minPrice < 0 || Number.isNaN(minPrice)) {
        errors.minPrice = "Minimum price must be greater than or equal to 0"
    }
    if (maxPrice < 0 || Number.isNaN(maxPrice)) {
        errors.minPrice = "Maximum price must be greater than or equal to 0"
    }

    if (Object.keys(errors).length > 0) {
        res.status(400);
        res.json(queryValidationErrorObj);
    }


    let query = {};
    if (parseInt(page) >= 1 && parseInt(page) <= 10 && parseInt(size) >= 1 && parseInt(size) <= 20) {
        query.limit = size;
        query.offset = size * (page - 1);
    }

    const spots = await Spot.findAll({
        ...query
    });

    const spotsArray = [];
    spots.forEach(spot => {
        spotsArray.push(spot.toJSON());
    })

    for (const spot of spotsArray) {
        const avgRating = await findAverageRating(spot);
        const previewImg = await findPreviewImg(spot);
        spot.avgRating = avgRating;
        spot.previewImage = previewImg.url;
    }

    res.json({"Spots": spotsArray, page, size});
});

// GET all spots owned by the current user;
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    });

    const spotsArray = [];
    spots.forEach(spot => {
        spotsArray.push(spot.toJSON());
    })

    for (const spot of spotsArray) {
        const avgRating = await findAverageRating(spot);
        const previewImg = await findPreviewImg(spot);
        spot.avgRating = avgRating;
        spot.previewImage = previewImg.url;
    }
    res.json({"Spots": spotsArray});
})


// GET specific spot by id
router.get('/:spotId', async (req, res) => {
    // Find spot by its primary key from the parameter
    let spot = await Spot.findByPk(req.params.spotId, {
        // Along with spot, include the spot images and owner details
        include: [
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            }
            // {
            //     model: User,
            //     attributes: ["id", "firstName", "lastName"]
            // }
        ]
    })

    // If no spot exists, return 404 error
    if (!spot) {
        res.status(404);
        res.json(spotNotFound);
    }

    let owner = await User.findByPk(spot.ownerId, {
        attributes: ["id", "firstName", "lastName"]
    });

    spot = spot.toJSON();
    // Find reviews for the spots
    const reviews = await Review.findAll({
        where: {
            spotId: spot.id
        },
    })

    spot.numReviews = reviews.length;
    if (spot.numReviews > 0) {
        const avgRating = await findAverageRating(spot)
        spot.avgStarRating = avgRating;
    } else {
        spot.avgStarRating = null
    }
    spot.Owner = owner;

    res.json(spot);
})

router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const potentialSpot = [address, city, state, country, lat, lng, name, description, price];
    validateSpot(potentialSpot);

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    })
    res.status(201);
    res.json(newSpot);
})

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    // If no spot exists, return 404 error
    if (!spot) {
        res.status(404);
        res.json(spotNotFound);
    }

    let newImg = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview
    })

    newImg = newImg.toJSON();
    delete newImg.spotId;
    delete newImg.createdAt;
    delete newImg.updatedAt;

    res.json(newImg);
})

router.put('/:spotId', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    // If no spot exists, return 404 error
    if (!spot) {
        res.status(404);
        res.json(spotNotFound);
    }

    spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.json(spot)
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    // If no spot exists, return 404 error
    if (!spot) {
        res.status(404);
        res.json(spotNotFound);
    }

    if (spot.ownerId !== req.user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden"
        })
    }

    await spot.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

// Review Endpoints:

// GET all review by a spot id
router.get("/:spotId/reviews", async (req, res) => {

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        res.json(spotNotFound);
    }

    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    const reviewArray = [];
    reviews.forEach(review => {
        reviewArray.push(review.toJSON());
    })

    for (let review of reviewArray) {
        const user = await User.findOne({
            where: {
                id: review.userId
            },
            attributes: ["id", "firstName", "lastName"]
        })

        const reviewImgs = await ReviewImage.findOne({
            where: {
                reviewId: review.id
            },
            attributes: ["id", "url"]
        })

        review.User = user;
        review.ReviewImages = reviewImgs;
    }

    res.json({"Reviews": reviewArray});
})

// Create a review for a spot based on spotsId
router.post("/:spotId/reviews", /*requireAuth */ async (req, res) => {
    const { review, stars } = req.body;

    if (!review || stars > 5 || stars < 1 || stars.toUpperCase != stars.toLowerCase) {
        const err = {
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
              }
        }
        res.status(400);
        res.json(err);
    }
    const spot = await Spot.findByPk(req.params.spotId);

    // If no spot exists, return 404 error
    if (!spot) {
        res.status(404);
        return res.json(spotNotFound);
    }

    
    // const previousReview = await Review.findOne({
    //     where: {
    //         userId: req.user.id
    //     }
    // })

    const allReviews = await Review.findAll({
        where: {
            spotId:req.params.spotId
        }
    });
    
    const reviewArray = [];
    allReviews.forEach(review => {
        reviewArray.push(review.toJSON());
    })

    let previousReview;
    for (let review of reviewArray) {
        if (review.userId === req.user.id) {
            previousReview = review;
        }
    }
    
    // console.log("UserId: ", req.user.id);
    if (previousReview) {
        // console.log("Previous Review userId: ", previousReview.userId);
    }
    if (previousReview) {
        res.status(403);
        return res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }

    const newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review,
        stars
    })

    res.json(newReview);
})

// Bookings Endpoints
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        res.json(spotNotFound);
    }

    if (req.user.id == spot.ownerId) {
        const bookings = await booking.findAll({
            where: {
                spotId: req.params.spotId
            }
        })

        const bookingsArray = [];
        bookings.forEach(booking => {
            bookingsArray.push(booking.toJSON());
        })

        for (const booking of bookingsArray) {
            const user = await User.findByPk(booking.userId, {
                attributes: ["id", "firstName", "lastName"]
            })
            booking.User = user;
        }
        res.json({"Bookings": bookingsArray});
    } else {
        const bookings = await Booking.findAll({
            where: {
                userId: req.user.id
            },
            attributes: ["spotId", "startDate", "endDate"]
        })
        res.json({"Bookings": bookings})
    }
})

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        res.json(spotNotFound);
    }

    const { startDate, endDate } = req.body;

    const startDateType = new Date(startDate);
    const endDateType = new Date(endDate);

    if (endDateType <= startDateType) {
        res.status(400);
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })
    bookings.forEach(booking => {
        const currentBookingStart = new Date(booking.startDate);
        const currentBookingEnd = new Date(booking.endDate);

        if ((currentBookingStart <= startDateType && currentBookingEnd >= startDateType)
        || (currentBookingStart <= endDateType && currentBookingEnd >= startDateType)) {
            res.status(403);
            return res.json({"message": "Sorry this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with existing booking"
            }});
        }
        if (Date(booking.startDate) <= startDateType && Date(booking.endDate) >= endDateType) {
            res.status(403);
            return res.json({
                "message": "Sorry this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with existing booking"
                }
            })
        }
    })

    const newBooking = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate: startDateType,
        endDate: endDateType
    })

    res.json(newBooking);
})

function checkSpotExistence(spot) {
    if (!spot) {
        res.status(404);
        res.json(spotNotFound);
    }
}

function validateSpot(address, city, state, country, lat, lng, name, description, price) {
    const error = {};
    let errorCounter = 0;
    error.message = "Validation Error";
    error.statusCode = 400;
    const errorsObj = {};
    if (!address) {
        errorsObj.address = "Street address is required"
    }
}
module.exports = router;
