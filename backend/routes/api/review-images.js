const express = require('express');
const router = express.Router();

const { Review, ReviewImage, } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete("/:imageId", requireAuth, async (req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);

    // Check to see if spot image exists
    if (!reviewImage) {
        res.status(404);
        res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }

    await reviewImage.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
