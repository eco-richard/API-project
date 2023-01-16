import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spots";
import SpotShowHeader from "./SpotShowHeader";
import SpotShowImages from "./SpotShowImages";
import SpotShowInfo from "./SpotShowInfo";
import Review from "../Reviews";
import './SpotShow.css'

const SpotShow = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [spotId, dispatch])

    if (Object.values(spot).length === 0) return null;

    return (
        <div className="spot-show">
            <SpotShowHeader spot={spot} />
            <SpotShowImages spot={spot} />
            <SpotShowInfo spot={spot} />
        </div>
    )
}

export default SpotShow;