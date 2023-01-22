import { useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import EditSpotModal from "../../EditSpotModal";
import DeleteSpotModal from "../../DeleteSpotModal";
import './SpotShowHeader.css'

function SpotShowHeader({ spot }) {
    const sessionUser = useSelector(state => state.session.user)

    const ratingContent = spot.avgStarRating === null ? (
        <>No reviews yet </>
    ) : (
        <>
        <i className="fa-solid fa-star" /> {Math.round((spot.avgStarRating * 100) / 100).toFixed(2)} · {spot.numReviews === 1 ? `${spot.numReviews} review ` : `${spot.numReviews} reviews `}
        </>
    )

    return (
        <div className="spot-show-header-wrapper">
            <div className="spot-show-header-name">
                <h1>{spot.name}</h1>
            </div>
            <div className="spot-show-header-info">
                <div className="header-reviews-locale">
                    {ratingContent} · {`${spot.city}, ${spot.state}, ${spot.country}`}
                    {/* {spot.avgRating && <i className="fa-solid fa-star"></i> {averageRating}} */}
                </div>
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
                         modalComponent={<DeleteSpotModal spotId={spot.id}/>}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SpotShowHeader;
