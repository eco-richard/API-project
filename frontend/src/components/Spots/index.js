// import React from "react";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import SpotItem from "../SpotItem";
import { getSpots } from '../../store/spots';
import "./Spots.css"

const Spots = () => {
    const dispatch = useDispatch();
    // Get the spots object from the store.spots slice of state
    const spotsObj = useSelector(state => state.spots.allSpots);
    // Convert the spotsObj into an array
    const spots = Object.values(spotsObj);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch])

    return (
        <div className="spots-main">
            {spots.map((spot) => (
                <SpotItem
                spot={spot}
                key={spot.id}
                />
            ))}
        </div>
    )
}

export default Spots;