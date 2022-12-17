import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getSpotReviews } from "../../store/review";
import CreateReviewModal from "../CreateReviewModal";
import OpenModalButton from "../OpenModalButton";

const Review = ({spotId}) => {
    const dispatch = useDispatch();
    const rInfo = useSelector(state => state.reviews);
    const reviewsObj = useSelector(state => state.reviews.spot);
    console.log("State.reviews: ", rInfo);
    console.log("Review Obj: ", reviewsObj);
    useEffect(() => {
        dispatch(getSpotReviews(spotId));
    }, [dispatch])

    const reviews = Object.values(reviewsObj);
    return (
        <>
        <h2>
            Reviews
        </h2>
        {reviews.map((review) => (
            <div key={review.id}>UserId: {review.userId} --- {review.review}</div>
        ))}
        <OpenModalButton
        buttonText="Add a Review"
        modalComponent={<CreateReviewModal spotId={spotId} />}
        />
        </>
    )
}

export default Review;