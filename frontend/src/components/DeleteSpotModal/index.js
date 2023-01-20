import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

import { getSingleSpot } from "../../store/spots";
import { deleteSpot } from "../../store/spots";

const DeleteSpotModal = ({spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    // const spotId = useParams();
    const spotObj = useSelector(state => state.spots);
    const spot = spotObj.singleSpot;
    // console.log("SpotId from delete:", spot.id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(deleteSpot(spotId)).then(closeModal)
        history.push('/');
    }

    return (
        <div className="delete-spot-button-div">
            Are you sure you want to delete?
            <button type="submit" onClick={handleSubmit}>Delete</button>
        </div>
    )
}

export default DeleteSpotModal;