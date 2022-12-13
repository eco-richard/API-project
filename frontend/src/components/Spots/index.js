import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Spots() {
    const spots = useSelector(state => Object.values(state.spots))
    return (
        <div className="spots-main">
            Spots:
            {/* {spots.map(spot => (
                <div key={spot.id} className="single-spot">
                    spot.name;
                </div>
            ))} */}
        </div>
    )
}