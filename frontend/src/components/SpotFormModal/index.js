import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import * as spotActions from "../../store/spots"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './SpotForm.css';

function SpotFormModal() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    
    // Hooks for creating a spot:
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(1);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation Checking:
        if (name === "") {
            return setErrors(["A name must be provided."])
        }

        // Others:

        setErrors([]);
        return dispatch(spotActions.addSpot({
            name, 
            description,
            address, 
            city, 
            state, 
            country, 
            lat, 
            lng,
            price 
            })).then(closeModal).catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    return (
        <>
        <h1>Create a Spot</h1>
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Name
                <input
                  type="text"
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
            <button type="submit">Create</button>
        </form>
        </>
    )
}

export default SpotFormModal;