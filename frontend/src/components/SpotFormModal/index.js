import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import * as spotActions from "../../store/spots"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import './SpotForm.css'

function SpotFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    
    // Hooks for creating a spot:
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    // const [lat, setLat] = useState("");
    // const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState([]);
    const [previewImgUrl, setPreviewImgUrl] = useState(""); 
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation Checking:
        if (name === "") {
            return setErrors(["A name must be provided."])
        }

        // Others:

        setErrors([]);
        const newSpot = await dispatch(spotActions.addSpot({
          name, 
          description,
          address, 
          city, 
          state, 
          country, 
          lat: 100, 
          lng: 100,
          price 
        }, previewImgUrl));
        closeModal();

        console.log("NewSpot:", newSpot);
        history.push(`/spots/${newSpot.id}`);
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="create-spot-form">
          <div className="create-spot-form-header">
            <span>Create a Spot</span>
          </div>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Name"
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
            <label>
                <input
                 className="form-field"
                 type="url"
                 value={previewImgUrl}
                 onChange={e => setPreviewImgUrl(e.target.value)}
                 required
                 placeholder="Image URL"
                 />
            </label>
            <button type="submit" className="spot-submit-button">Create</button>
        </form>
        </>
    )
}

export default SpotFormModal;