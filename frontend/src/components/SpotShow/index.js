import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spots";
import EditSpotModal from "../EditSpotModal";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";
import Review from "../Reviews";
import SpotItem from "../SpotItem";
import './SpotShow.css'
const SpotShow = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);

    const previewImgURL = spot.SpotImages?.find(image => image.preview)?.url;
    console.log("SpotIMages: ", spot.SpotImages);
    let nonPreviewImgs;
    nonPreviewImgs = spot.SpotImages?.filter(image => !image.preview);
    console.log("Non-preview Images: ", nonPreviewImgs);
    // console.log("Spot IMages[0]: ", spotImages[0]);
    // for (let i = 0; i < spotImages.length; i++) {
    //     const image = spotImages[0];
    //     if (image.preview) {
    //         previewImage = image;
    //         break;
    //     }
    // }

    const reviewsObj = useSelector(state => state.reviews.spot);
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

    return (
        <div className="spot-show">
            {/* {spot.SpotImages.forEach(image => {
                <img src={image.url} alt="house.jpg" />;
            })} */}
            {/* {Object.keys(spot).forEach(key => {
                <ul>
                    <li>
                        Spot {key}: {spot[key]}
                    </li>
                </ul>
            })} */}
            <div className="location-header">
                <div className="spot-name-div">
                <h1>{spot.name}</h1>
                </div>
                <div className="spot-show-location-rating">
                    {numReviews} review{numReviews === 1 ? "" : 's'} · {spot.city}, {spot.state}, {spot.country}
                </div>
            </div>
            {user && user.id === spot.ownerId && (
                <div className="spot-buttons">
                    <OpenModalButton
                        className="button"
                        buttonText="Edit Spot"
                        modalComponent={<EditSpotModal />}
                    />
                    <OpenModalButton
                        className="button"
                        buttonText="Delete Spot"
                        modalComponent={<DeleteSpotModal spotId={spotId} />}
                    />
                </div>
            )
            }
            <div className="spot-images-container">
                <img className="spot-image-left" src={previewImgURL} alt="img-1" />
                <div className="spot-images-right">
                    <div className="image-grid-top-left">
                        {nonPreviewImgs && <img src={nonPreviewImgs[0].url} alt="1" />}
                    </div>
                    <div className="image-grid-bottom-left">
                        {nonPreviewImgs && <img src={nonPreviewImgs[1].url} alt="1" />}
                    </div>
                    <div className="image-grid-top-right">
                        {nonPreviewImgs && <img src={nonPreviewImgs[2].url} alt="1" />}
                    </div>
                    <div className="image-grid-bottom-right">
                        {nonPreviewImgs && <img src={nonPreviewImgs[3].url} alt="1" />}
                    </div>
                </div>
            </div>
            <div className="spot-info">
                <div className="review-wrapper">
                    <hr />
                    <Review spotId={spotId} />
                </div>
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