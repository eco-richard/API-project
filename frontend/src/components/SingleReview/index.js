import React from "react"
import OpenModalButton from "../OpenModalButton"
import DeleteReviewModal from "../DeleteReviewModal"
import CreateReviewModal from "../CreateReviewModal"
import { useModal } from "../../context/Modal"
import { useSelector } from "react-redux"
import './SingleReview.css'

function SingleReview({review, sessionUser, spotId}) {
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user);
    if (!review?.id) return (
        <div className="no-reviews">
            This spot has yet to be reviewed.
        </div>
    )

    let deleteReviewContent = null;
    if (user.id === review.userId) {
        deleteReviewContent = (
            <div className="delete-review-div">
                <OpenModalButton
                    modalComponent={<DeleteReviewModal reviewId={review.id} />}
                    buttonText="Delete Review"
                    onButtonClick={closeModal}
                />
            </div>
        )
    }

    return (
        <div className="review-box">
            <div className="reviewer-header">
                <div className="reviewer-name">
                    {review?.User.firstName}
                </div>
                {deleteReviewContent}
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