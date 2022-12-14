import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spots";

const SpotShow = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    console.log("SpotId from useParams(): ", spotId)
    const spotObj = useSelector(state => state.spots);
    const spot = spotObj.singleSpot;
    console.log("Spot from SpotShow: ", spot);
    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [dispatch])
    return (
        <div className="spot-show">
            {spot.name}
        </div>
    )
}

export default SpotShow;