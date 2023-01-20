import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

import { updateSpot } from "../../store/spots";
import './EditSpot.css'
const EditSpotModal = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spotObj = useSelector(state => state.spots);
    const spot = spotObj.singleSpot;
    // console.log("Spot from EditSpot: ", spot)

    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    // const [lat, setLat] = useState(spot.lat);
    // const [lng, setLng] = useState(spot.lng);
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
            lat: 100,
            lng: 100,
            price
        }, spot.id))

        closeModal();
    }

    return (
      <>
        <form onSubmit={handleSubmit} className="edit-spot-form">
          <div className="edits-spot-form-header">
            <img src="https://www.vhv.rs/dpng/d/487-4871907_grey-x-icon-png-transparent-png.png" height="20px" weight="20px" alt="x" onClick={() => closeModal()} />
            <span>Modify Spot</span>
          </div>
            <ul>
                {errors.map((error, index) => <li key={index}>error</li>)}
            </ul>
            <label>
                <input
                  className="form-field"
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                  placeholder="Address"
                />
            </label>
            <label>
                <input
                  className="form-field"
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  required
                  placeholder="City"
                />
            </label>
            <label>
                <input
                  className="form-field"
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  required
                  placeholder="State"
                />
            </label>
            <label>
                <input
                  className="form-field"
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  required
                  placeholder="Country"
                />
            </label>
            <label>
                <input
                  className="form-field"
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
            </label>
            <label>
                <input
                  className="form-field"
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  placeholder="Description"
                />
            </label>
            {/* <label>
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
            </label> */}
            <label>
                <input
                className="form-field"
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                  placeholder="Price per night"
                />
            </label>
            <button type="submit" className="spot-submit-button">Submit</button>
        </form>
        </>
    )
}

export default EditSpotModal