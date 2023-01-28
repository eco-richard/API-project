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
    console.log("Reviews: ", reviews);
    const spot = useSelector(state => state.spots.singleSpot);
    
    useEffect(() => {
        dispatch(getSpotReviews(spotId));
    }, [dispatch])

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