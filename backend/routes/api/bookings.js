const express = require('express');
const router = express.Router();

const { Booking, Spot, SpotImage } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')

// GET all current user's bookings
router.get("/current", requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        }
    })

    const bookingsArray = [];
    bookings.forEach(booking => {
        bookingsArray.push(booking.toJSON());
    })

    for (const booking of bookingsArray) {
        let spot = await Spot.findByPk(booking.spotId, {
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
                "price",
            ]
        });
        spot = spot.toJSON();

        const previewImg = await SpotImage.findOne({
            where: {
                preview: true,
                spotId: spot.id
            }
        })
        spot.previewImage = previewImg.url;
        booking.Spot = spot;
    }

    res.json({"Bookings": bookingsArray});
})

// Edit a booking
router.put("/:bookingId", requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;

    const startDateType = new Date(startDate);
    const endDateType = new Date(endDate);

    if (endDateType < startDateType) {
        res.status(400);
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
    }

    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    booking.update({
        startDate,
        endDate
    })

    res.json(booking);
})

// DELETE a booking
router.delete("/:bookingId", async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    if (Date(booking.startDate) < Date.now()) {
        res.status(403);
        return res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
    }

    await booking.destroy();

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
