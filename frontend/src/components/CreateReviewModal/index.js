import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { addReview, getSpotReviews } from "../../store/review";
import { getSingleSpot } from "../../store/spots";
import './CreateReviewModal.css'
const CreateReviewModal = ({spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const reviewsObj = useSelector(state => state.reviews.spot);
    const reviews = Object.values(reviewsObj);
    const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.singleSpot);
    const [review, setReview] = useState("");
    const [stars, setStars] = useState();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    let previousReview;
    for (let review of reviews) {
        if (review.userId === user.id) {
            previousReview = true;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = [];
        if (spot.ownerId === user.Id) {
            newErrors.push("Owners may not review their own spots.")
        } else if (previousReview) {
            newErrors.push("You may only have one review per spot.")
        }

        if (review.length <= 3) {
            errors.push("Is that really all you have to say?")
        }

        if (!stars) {
            errors.push("Please give it a rating of 1 to 5 stars.")
        }
        setErrors(newErrors);
        await dispatch(addReview({
            review,
            stars
        }, spotId)).then(closeModal)
        await dispatch(getSpotReviews(spotId))
        await dispatch(getSingleSpot(spot.id));
        // // history.replace(`/`);
        // setTimeout(() => history.push(`/spots/${spotId}`), 100);
    }
    return (
        <div className="review-form-wrapper">
            <div className="review-form-header">
                <button className="close-out-button" onClick={closeModal}>
                    <i className="fa-solid fa-x" />
                </button>
                <p>Leave a Review!</p>
            </div>
        <div className="review-form-fields-div">
        <form onSubmit={handleSubmit} className="create-review-form">
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div className="review-stars-wrapper">
            Stars: 
            <input 
            type="radio" 
            id="1-star"
            name="stars"
            value={1}
            onClick={((e) => setStars(1))}
            className="stars-radio"
            required
             />
            1
            <input 
            type="radio" 
            id="2-stars"
            name ="stars"
            value={2}
            onClick={((e) => setStars(2))}
            className="stars-radio"
             />
            2
            <input 
            type="radio" 
            id="3-stars"
            name="stars"
            value={3}
            onClick={((e) => setStars(3))}
            className="stars-radio"
             />
            3
            <input 
            type="radio" 
            id="4-stars"
            name="stars"
            value={4}
            onClick={((e) => setStars(4))}
            className="stars-radio"
             />
            4
            <input 
            type="radio" 
            id="5-stars"
            name="stars"
            value={5}
            onClick={((e) => setStars(5))}
            className="stars-radio"
             />
            5
            </div>
            <label>
                <input
                className="review-description-form-field"
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                placeholder="Review"
                />
            </label>
            <button type="submit" className="spot-submit-button">Post</button>
        </form>
        </div>
        </div>
    )   
}

export default CreateReviewModal