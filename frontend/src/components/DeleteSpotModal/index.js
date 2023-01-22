import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

import { getSingleSpot } from "../../store/spots";
import { deleteSpot } from "../../store/spots";
import './DeleteSpot.css'
const DeleteSpotModal = ({spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const spotObj = useSelector(state => state.spots);
    const spot = spotObj.singleSpot;

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(deleteSpot(spotId)).then(closeModal)
        history.push('/');
    }

    return (
        <div className="delete-spot-button-wrapper">
            Are you sure you want to delete?
            <div className="delete-spot-button-div">
                <button type="submit" onClick={handleSubmit}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteSpotModal;