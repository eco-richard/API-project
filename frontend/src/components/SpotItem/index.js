import React from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

export default function SpotItem({ spot }) {
    // const dispatch = useDispatch();

    return (
        <div>
            <Link to={`/api/spots/${spot.id}`}>{spot.name}</Link>
        </div>
    )
}