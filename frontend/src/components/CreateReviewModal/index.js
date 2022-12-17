import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { addReview, getSpotReviews } from "../../store/review";

const CreateReviewModal = ({spotId}) => {
    const dispatch = useDispatch();
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
    useEffect(() => {
        if (spot.ownerId === user.id) {
            errors.push("Owners can not review their own spots.")
        } else {
            if (previousReview) {
                errors.push("You may only have one review per spot.")
            } else {
                if (review === "") {
                    errors.push("Reviews must contain some commentary.")
                } else {
                    if (review.length <= 3) {
                        errors.push("Is that really all you had to say?")
                    }
                    if (!stars) {
                        errors.push("Please give it a star rating.")
                    }
                }
            }
        }

        setErrors(errors);
    }, [previousReview, stars, errors])
    const handleSubmit = async (e) => {
        e.preventDefault();

        // setErrors([]);
        await dispatch(addReview({
            review,
            stars
        }, spotId)).then(closeModal)
        await dispatch(getSpotReviews(spotId))
    }
    return (
        <>
        <form onSubmit={handleSubmit} className="create-review-form">
            <div className="form-header">Leave a Review!</div>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                <input
                className="form-field"
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                placeholder="Review"
                />
            </label>
            Stars
            <input 
            type="radio" 
            id="1-star"
            name="stars"
            value={1}
            onClick={((e) => setStars(1))}
            required
             />
            1
            <input 
            type="radio" 
            id="2-stars"
            name ="stars"
            value={2}
            onClick={((e) => setStars(2))}
             />
            2
            <input 
            type="radio" 
            id="3-stars"
            name="stars"
            value={3}
            onClick={((e) => setStars(3))}
             />
            3
            <input 
            type="radio" 
            id="4-stars"
            name="stars"
            value={4}
            onClick={((e) => setStars(4))}
             />
            4
            <input 
            type="radio" 
            id="5-stars"
            name="stars"
            value={5}
            onClick={((e) => setStars(1))}
             />
            5
            <button type="submit" className="spot-submit-button">Post</button>
        </form>
        </>
    )   
}

export default CreateReviewModal