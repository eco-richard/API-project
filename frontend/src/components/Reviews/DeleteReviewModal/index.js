import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";

import { getSingleSpot } from "../../../store/spots";
import { deleteReview } from "../../../store/review";

import './DeleteReviewModal.css';

const DeleteReviewModal = (reviewId) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const spot = useSelector(state => state.spots.singleSpot);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(deleteReview(reviewId));
        closeModal();
        await dispatch(getSingleSpot(spot.id));
    }

    return (
        <div className="delete-review-button-div">
            Are you sure you want to delete this review?
            <div className="delete-button-div">
                <button onClick={handleSubmit}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal;