import React from "react"
import OpenModalButton from "../OpenModalButton"
import DeleteReviewModal from "../DeleteReviewModal"
import CreateReviewModal from "../CreateReviewModal"
import { useModal } from "../../context/Modal"

function SingleReview({review, sessionUser, spotId}) {
    const { closeModal } = useModal(); 
    // console.log("Single Review: ", review);
    // console.log("Single Review id: ", review.id);
    if (!review?.id) return (
        <div className="no-reviews">
            This spot has yet to be reviewed.
        </div>
    )

    return (
        <div className="review-box">
            <div className="reviewer-name">
                {review?.User.firstName}
            </div>
            <div className="review-data">
                {review?.review}
            </div>
            {/* {review?.User.id === +sessionUser.id && 
            (<div className="delete-review-button">
                {<OpenModalButton
                    buttonText="Delete Review"
                    // modalComponent={<DeleteReviewModal reviewId={review.id} />}
                    onButtonClick={closeModal}
                /> }
            </div>)} */}
        </div>
    )
}

export default SingleReview;