import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getSpotReviews } from "../../store/review";
import CreateReviewModal from "../CreateReviewModal";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal"
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal"
import SingleReview from "../SingleReview";
import './Reviews.css'
const Review = ({spotId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);
    let reviews = useSelector(state => state.reviews.spot);
    reviews = Object.values(reviews);
    const spot = useSelector(state => state.spots.singleSpot);
    
    useEffect(() => {
        dispatch(getSpotReviews(spotId));
    }, [dispatch])

    let sum = 0;
    let reviewCounter = 0;
    let avgRating;
    for (let review of reviews) {
        if (review.spotId === +spot.id) {
            sum += review.stars;
            reviewCounter++;
        }
    }
    avgRating = reviewCounter === 0 ? 0 : sum / reviewCounter;
    // if (reviews.length === 0) {
    //     return (
    //         <div className="no-reviews">
    //             <p>Seems this spot has yet to be reviewed</p>
    //         </div>
    //     )
    // }

    return (
        <div className="reviews-wrapper">
            <div className="reviews-body">
                {reviews.map((review) => (
                    <SingleReview 
                    key={review.id}
                    review={review} 
                    sessionUser={sessionUser} 
                    spotId={spotId} />
                ))}
            </div>
        </div>
    );
}

export default Review;