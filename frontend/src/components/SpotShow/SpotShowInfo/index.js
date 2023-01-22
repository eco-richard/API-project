import { useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import CreateReviewModal from "../../CreateReviewModal";
import { useModal } from "../../../context/Modal";
import Review from "../../Reviews";
import PriceBox from "../PriceBox";
import './SpotShowInfo.css'

function SpotShowInfo({ spot }) {
    // let avgRating = spot.avgStarRating ===
    const sessionUser = useSelector(state => state.session.user);
    const { closeModal } = useModal();
    const ratingContent = spot.avgStarRating === null ? (
        <p>No reviews yet</p>
    ) : (
        <>
        <i className="fa-solid fa-star" /> {(Math.round((spot.avgStarRating * 100) / 100)).toFixed(2)}·{spot.numReviews === 1 ? `${spot.numReviews} review` : `${spot.numReviews} reviews`}
        </>
    )
    const ratingBody = spot.avgStarRating === null ? (
        <p>If you stayed here, be the first to review!</p>
    ) : null


    return (
        <div className="spot-show-info-wrapper">
            <div className="info-review-wrapper">
                <div className="info-review-header-div">
                <h2>
                {/* <i className="fa-solid fa-star" /> {spot.avgStarRating} · {spot.numReviews === 1 ? `${spot.numReviews} review` : `${spot.numReviews} reviews`} */}
                {ratingContent}
                </h2>
                {sessionUser && sessionUser.id !== +spot.ownerId && (<OpenModalButton
                buttonText="Add a Review"
                modalComponent={<CreateReviewModal spotId={spot.id} />}
                onButtonClick={closeModal}
                />
                )}
                </div>
                <hr />
                {ratingBody ? (
                    ratingBody
                ) : (
                    <Review spotId={spot.id} />
                )}
                
            </div>
            <PriceBox spot={spot} />
        </div>
    )
}

export default SpotShowInfo;