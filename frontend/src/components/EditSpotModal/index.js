import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

// import { getSingleSpot } from "../../store/spots";
import { updateSpot } from "../../store/spots";

const EditSpotModal = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spotObj = useSelector(state => state.spots);
    const spot = spotObj.singleSpot;
    console.log("Spot from EditSpot: ", spot)

    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(updateSpot({
            name,
            description, 
            address, 
            city,
            state, 
            country,
            lat,
            lng,
            price
        }, spot.id))

        closeModal();
    }

    return (
        <div className="edit-spot-form">
        <h1>Edit Spot</h1>
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, index) => <li key={index}>error</li>)}
            </ul>
        <label>
                Name
                <input
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
            </label>
            <label>
                Description
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
            </label>
            <label>
                Address
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                />
            </label>
            <label>
                City
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  required
                />
            </label>
            <label>
                State
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  required
                />
            </label>
            <label>
                Country
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  required
                />
            </label>
            <label>
                Latitude
                <input
                  type="number"
                  value={lat}
                  onChange={e => setLat(e.target.value)}
                  required
                />
            </label>
            <label>
                Longitude
                <input
                  type="number"
                  value={lng}
                  onChange={e => setLng(e.target.value)}
                  required
                />
            </label>
            <label>
                Price
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
        </div>
    )
}

export default EditSpotModal