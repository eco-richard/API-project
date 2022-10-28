const express = require('express');
const router = express.Router();

const { Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete("/:imageId", requireAuth, async (req, res) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId);

    // Check to see if spot image exists
    if (!spotImage) {
        res.status(404);
        res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }

    await spotImage.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
