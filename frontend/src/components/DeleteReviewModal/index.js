import React from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

import { getSingleSpot } from "../../store/spots";
import { deleteReview } from "../../store/review";

const DeleteReviewModal = (reviewId) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("In handleSubmit of delete")
        await dispatch(deleteReview(reviewId));
        closeModal();
        // closeModal();

        history.push('/');
    }

    return (
        <div className="delete-review-button-div">
            Are you sure you want to delete this review?
            <button onClick={handleSubmit}>Delete</button>
        </div>
    )
}

export default DeleteReviewModal;