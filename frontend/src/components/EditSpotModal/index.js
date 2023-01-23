import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getSingleSpot, updateSpot } from "../../store/spots";

import './EditSpot.css'
const EditSpotModal = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spotObj = useSelector(state => state.spots);
    const spot = spotObj.singleSpot;
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

        // Validation Checking:
        const newErrors = []; 

        if (name.length < 2) {
          newErrors.push("Name is too short, should be at least 2 characters.")
        }
        if (description.length < 2) {
          newErrors.push("Description is too short, should be at least 2 characters.")
        }
        if (address.length < 2) {
          newErrors.push("Address is too short, should be at least 2 characters.")
        }
        if (city.length < 2) {
          newErrors.push("City is too short, should be at least 2 characters.")
        }
        if (state.length < 2) {
          newErrors.push("State is too short, should be at least 2 characters.")
        }
        if (country.length < 2) {
          newErrors.push("Country is too short, should be at least 2 characters.")
        }
        if (+price === 0) {
          newErrors.push("Free housing?")
        }
        setErrors(newErrors);

        if (newErrors.length === 0) {
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
        // dispatch(getSingleSpot(spot.id))
    }

    return (
      <div className="edit-spot-form-wrapper">
        <div className="edit-spot-form-header">
          <button className="close-out-button" onClick={closeModal}>
            <i className="fa-solid fa-x"></i>
          </button>
          <p>Update Spot</p>
        </div>
        <form onSubmit={handleSubmit} className="edit-spot-form">
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
            {/* <label>
                <input
                 className="form-field"
                 type="url"
                 value={previewImgUrl}
                 onChange={e => setPreviewImgUrl(e.target.value)}
                 required
                 placeholder="Image URL"
                 />
            </label> */}
            <button type="submit" className="spot-submit-button">Submit</button>
        </form>
        </div>
    )
}

export default EditSpotModal