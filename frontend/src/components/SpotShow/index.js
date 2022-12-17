import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spots";
import EditSpotModal from "../EditSpotModal";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";
import Review from "../Reviews";
import SpotItem from "../SpotItem";

const SpotShow = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    console.log("SpotId from useParams(): ", spotId)
    const spotObj = useSelector(state => state.spots);
    const spot = spotObj.singleSpot;
    console.log("Spot from SpotShow: ", spot);

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [spotId, dispatch])

    return (
        <div className="spot-show">
            {/* {spot.SpotImages.forEach(image => {
                <img src={image.url} alt="house.jpg" />;
            })} */}
            {Object.keys(spot).forEach(key => {
                <ul>
                    <li>
                        Spot {key}: {spot[key]}
                    </li>
                </ul>
            })}
            {spot.for}
            {spot.name}
            {spot.description}
            {spot.address}
            {spot.city}
            {spot.country}
            {spot.lat}
            {spot.lng}
            {spot.price}
            <OpenModalButton
            buttonText="Edit Spot"
            modalComponent={<EditSpotModal />}
            />
            <OpenModalButton
            buttonText="Delete Spot"
            modalComponent={<DeleteSpotModal spotId={spotId} />}
            />
            <div className="review-wrapper">
                <Review spotId={spotId} />
            </div>
        </div>
    )
}

export default SpotShow;