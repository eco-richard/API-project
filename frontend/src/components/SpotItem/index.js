import React from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import "./SpotItem.css"

export default function SpotItem({ spot }) {
    // const dispatch = useDispatch();
    const country = spot.country === "United States" ? "" : `, ${spot.country}`;

    return (
        <div>
            <Link to={`/api/spots/${spot.id}`}>
                <div className="spot-box" key={spot.id}>
                    <div className="spot-image-div">
                        <img src={spot.previewImage} alt="spot"/>
                    </div>
                    <div className="spot-data">
                        <div className="spot-location">
                            {spot.city}, {spot.state}{country}
                        </div>
                        <div className="spot-price">
                            ${spot.price} night
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}