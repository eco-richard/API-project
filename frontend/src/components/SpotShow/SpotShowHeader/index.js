import { useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import EditSpotModal from "../../EditSpotModal";
import DeleteSpotModal from "../../DeleteSpotModal";
import './SpotShowHeader.css'

function SpotShowHeader({ spot }) {
    const sessionUser = useSelector(state => state.session.user)
    console.log("Spot: ", spot);

    const ratingContent = spot.avgStarRating === null ? (
        <p>No reviews yet</p>
    ) : (
        <>
        <i className="fa-solid fa-star" /> {spot.avgStarRating}·{spot.numReviews === 1 ? `${spot.numReviews} review ` : `${spot.numReviews} reviews `}
        </>
    )

    return (
        <div className="spot-show-header-wrapper">
            <div className="spot-show-header-name">
                <h1>{spot.name}</h1>
            </div>
            <div className="spot-show-header-info">
                <span className="header-reviews">
                    {ratingContent}
                    {/* {spot.avgRating && <i className="fa-solid fa-star"></i> {averageRating}} */}
                </span>
                <span className="header-location">
                    {`${spot.city}, ${spot.state}, ${spot.country}`}
                </span>
                {sessionUser && sessionUser.id === spot.ownerId && (
                    <div className="spot-owner-buttons">
                        <OpenModalButton
                         className="edit-spot-button"
                         buttonText="Update Spot"
                         modalComponent={<EditSpotModal />}
                         />
                        <OpenModalButton
                         className="delete-spot-button"
                         buttonText="Delete Spot"
                         modalComponent={<DeleteSpotModal />}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SpotShowHeader;
