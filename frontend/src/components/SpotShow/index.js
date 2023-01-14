import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spots";
import SpotShowHeader from "./SpotShowHeader";
import SpotShowImages from "./SpotShowImages";
import SpotShowInfo from "./SpotShowInfo";
import Review from "../Reviews";
import './SpotShow.css'

const SpotShow = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);

    // console.log("Spot Images: ", spot.SpotImages);
    const previewImgURL = spot.SpotImages?.find(image => image.preview)?.url;
    const nonPreviewImgs = spot.SpotImages?.filter(image => !image.preview);

    const reviewsObj = useSelector(state => state.reviews.spot);
    // console.log("Reviews Obj: ", reviewsObj)
    const reviews = Object.values(reviewsObj);

    let numReviews = 0;
    for (let review of reviews) {
        if (review.spotId === +spotId) {
            numReviews++;
        }
    }
    let avgRating;
    let sum = 0;
    let reviewCounter = 0;
    for (let review of reviews) {
        if (review.spotId === +spotId) {
            sum += review.stars
            reviewCounter++;
        }
    }
    avgRating = reviewCounter === 0 ? 0 : sum / reviewCounter;

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [spotId, dispatch])

    // console.log("SpotShow spot: ", spot);
    if (Object.values(spot).length === 0) return null;

    return (
        <div className="spot-show">
            <SpotShowHeader spot={spot} />
            <SpotShowImages spot={spot} />
            <SpotShowInfo spot={spot} />
            <div className="spot-info">
                <div className="price-box-wrapper">
                    <div className="price-box">
                        <div className="price-box-left">
                            ${spot.price} night
                        </div>
                        <div className="price-box-right">
                            <i className="fa-regular fa-star"></i>{avgRating.toFixed(2)} · {numReviews} review{numReviews === 1 ? "" : 's'} 
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SpotShow;