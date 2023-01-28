
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { getSpotReviews, updateReview } from '../../../store/review';
import { getSingleSpot } from '../../../store/spots';
import './EditReviewModal.css'

const EditReviewModal = ({spotId, review}) => {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    console.log("Review in update: ", review);
    console.log("Review in review: ", review.review);
    const [reviewDescription, setReviewDescription] = useState(review.review);
    const [stars, setStars] = useState(review.stars);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("event: ", e);

        const newErrors = [];

        if (reviewDescription.length <= 3) {
            newErrors.push("Is that really all you have to say?")
        }

        if (!stars) {
            newErrors.push("Please give it a rating of 1 to 5 stars");
        }

        setErrors(newErrors);

        if (newErrors.length === 0) {
            await dispatch(updateReview({
                review: reviewDescription,
                stars
            }, review.id, spotId)).then(closeModal)
            await dispatch(getSpotReviews(spotId))
            await dispatch(getSingleSpot(spotId))
        }
    }
    return (
        <div className='review-form-wrapper'>
            <div className='review-form-header'>
                <button className="close-out-button" onClick={closeModal}>
                    <i className="fa-solid fa-x" />
                </button>
                <p>Update Review</p>
            </div> {/* review-form-header */}
            <div className='review-form-fields-div'>
                <form onSubmit={handleSubmit} className="create-review-form">
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <div className='review-stars-wrapper'>
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
                    </div> {/* review-stars-wrapper */}
                    <label>
                        <input
                            className='review-description-form-field'
                            type="textbox"
                            value={reviewDescription}
                            onChange={(e) => setReviewDescription(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" className='spot-submit-button'>Update</button>
                </form>
            </div> {/* review-form-fields-div */}
        </div> /* review-form-wrapper */ 
    );
}

export default EditReviewModal;
