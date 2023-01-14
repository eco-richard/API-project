import Review from "../../Reviews";
import PriceBox from "../PriceBox";

function SpotShowInfo({ spot }) {
    // let avgRating = spot.avgStarRating ===
    const ratingContent = spot.avgStarRating === null ? (
        <p>No reviews yet</p>
    ) : (
        <>
        <i className="fa-solid fa-star" /> {spot.avgStarRating}·{spot.numReviews === 1 ? `${spot.numReviews} review` : `${spot.numReviews} reviews`}
        </>
    )
    const ratingBody = spot.avgStarRating === null ? (
        <p>If you stayed here, be the first to review!</p>
    ) : null


    return (
        <div className="spot-show-info-wrapper">
            <div className="info-review-wrapper">
                <h2>
                {/* <i className="fa-solid fa-star" /> {spot.avgStarRating} · {spot.numReviews === 1 ? `${spot.numReviews} review` : `${spot.numReviews} reviews`} */}
                {ratingContent}
                </h2>
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