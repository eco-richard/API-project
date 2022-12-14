// import React from "react";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import SpotItem from "../SpotItem";
import { getSpots } from '../../store/spots';

const Spots = () => {
    const spotsObj = useSelector(state => state.spots);
    const dispatch = useDispatch();
    console.log("SpotsObj: ", spotsObj);
    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch])

    const spots = Object.values(spotsObj.allSpots);
    console.log("Spots: ", spots);  

    return (
        <div className="spots-main">
            {
                spots.map((spot) => (
                    <SpotItem
                    spot={spot}
                    key={spot.id}
                    />
                ))
            }
        </div>
    )
}

export default Spots;