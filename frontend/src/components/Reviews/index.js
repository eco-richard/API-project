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
    console.log("Reviews: ", reviews);
    
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
            <div className="reviews-header">
                {reviews.length > 0 && reviews.length < 3 ? (
                    <div className="reviews-head">
                        <h2>
                            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                        </h2>
                        <p>
                            Average ratings will appear after 3 reviews.
                        </p>
                    </div>
                ) : (
                    <div className="reviews-head">
                        <h2>
                            <i className="fa-regular fa-star" />
                            {avgRating.toFixed(2)} · {reviewCounter} reviews
                        </h2>
                    </div>
                )}
            </div>
            <button></button>
            <div className="reviews-body">
                {reviews.map((rev) => (
                    <SingleReview review={rev} sessionUser={sessionUser} spotId={spotId} />
                ))}
            </div>
            {sessionUser && sessionUser.id !== +spot.ownerId && (<OpenModalButton
                buttonText="Add a Review"
                modalComponent={<CreateReviewModal spotId={spot.id} />}
                onButtonClick={closeModal}
                />
            )}
        </div>
    );
//     const dispatch = useDispatch();
//     const { closeModal } = useModal();
//     const sessionUser = useSelector(state => state.session.user);
//     const reviews = Object.values(useSelector(state => state.reviews.spot));
//     const spot = useSelector(state => state.spots.singleSpot);
//     let avgRating;
//     let sum = 0;
//     let reviewCounter = 0;
    
//     // const spot = useSelector(state => state.spots.singleSpot);
//     // console.log("Review Obj: ", reviewsObj);
//     useEffect(() => {
//         dispatch(getSpotReviews(spotId));
//     }, [dispatch])

//     // const reviews = Object.values(reviewsObj);
//     console.log("reviews: ", reviews)

//     for (let review of reviews) {
//         console.log(review);
//         if (review.spotId === +spot.id) {
//             sum += review.stars;
//             reviewCounter++;
//         }
//     }

//     avgRating = reviewCounter === 0 ? 0 : sum / reviewCounter;
//     return (
//         <>
//         <div className="review-header">
//             <i className="fa-regular fa-star"></i>{avgRating.toFixed(2)} · {reviewCounter} review{reviewCounter === 1 ? "" : 's'}
//         </div>
//         <hr />
//         {reviews.map((review) => (
//             <div key={review.id} className="review-box">
//                 <div className="reviewer-name">
//                     {review.User.firstName}
//                 </div>
//                 <div className="review-date">
//                     December 2022
//                 </div>
//                 <div className="review-text">
//                     {review.review}
//                 </div>
//                 {review.User.id === +sessionUser.id && 
//                 (<div className="delete-review-button">
//                     <OpenModalButton
//                     buttonText="Delete Review"
//                     modalComponent={<DeleteReviewModal reviewId={review.id} />}
//                     onButtonClick={closeModal}
//                     />
//                 </div>)}
//             </div>
//             )
//         )}
//         {sessionUser && sessionUser.id !== +spot.ownerId && (<OpenModalButton
//         buttonText="Add a Review"
//         modalComponent={<CreateReviewModal spotId={spot.id} />}
//         onButtonClick={closeModal}
//         /> )}
//         </>
//     )
// }
}

export default Review;