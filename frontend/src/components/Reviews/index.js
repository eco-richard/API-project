import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getSpotReviews } from "../../store/review";
import CreateReviewModal from "../CreateReviewModal";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal"
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal"
import './Reviews.css'
const Review = ({spotId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const rInfo = useSelector(state => state.reviews);
    const sessionUser = useSelector(state => state.session.user);
    const reviewsObj = useSelector(state => state.reviews.spot);
    const spot = useSelector(state => state.spots.singleSpot);
    let avgRating;
    let sum = 0;
    let reviewCounter = 0;
    
    // const spot = useSelector(state => state.spots.singleSpot);
    console.log("State.reviews: ", rInfo);
    console.log("Review Obj: ", reviewsObj);
    useEffect(() => {
        dispatch(getSpotReviews(spotId));
    }, [dispatch])

    const reviews = Object.values(reviewsObj);

    for (let review of reviews) {
        if (review.spotId === +spot.id) {
            sum += review.stars;
            reviewCounter++;
        }
    }

    avgRating = reviewCounter === 0 ? 0 : sum / reviewCounter;
    return (
        <>
        <div className="review-header">
            <i className="fa-regular fa-star"></i>{avgRating.toFixed(2)} · {reviewCounter} review{reviewCounter === 1 ? "" : 's'}
        </div>
        <hr />
        {reviews.map((review) => (
            <div key={review.id} className="review-box">
                <div className="reviewer-name">
                    {review.User.firstName}
                </div>
                <div className="review-date">
                    December 2022
                </div>
                <div className="review-text">
                    {review.review}
                </div>
                {review.User.id === +sessionUser.id && 
                (<div className="delete-review-button">
                    <OpenModalButton
                    buttonText="Delete Review"
                    modalComponent={<DeleteReviewModal reviewId={review.id} />}
                    onButtonClick={closeModal}
                    />
                </div>)}
            </div>
            )
        )}
        {sessionUser && sessionUser.id !== +spot.ownerId && (<OpenModalButton
        buttonText="Add a Review"
        modalComponent={<CreateReviewModal spotId={spot.id} />}
        onButtonClick={closeModal}
        /> )}
        </>
    )
}

export default Review;