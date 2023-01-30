import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser } from '../../../store/users';
import SingleReview from '../../Reviews/SingleReview';
import SpotItem from '../../Spots/SpotItem';
import './UserProfile.css'

function UserProfile({ user }) {
    const dispatch = useDispatch();
    let userDetailed = useSelector(state => state.users.singleUser);
    useEffect(() => {
        dispatch(getSingleUser(user))
    }, [dispatch])
    console.log("User Profile User: ", user)
    console.log("User Profile User Detailed: ", userDetailed);
    console.log("UserDetailed Spots: ", userDetailed.Spots.Spots);

    if (Object.values(userDetailed).length === 0) return null;
    return (
        <div className='user-profile-wrapper'>
        <div className='user-profile-info-wrapper'>
            <div className='up-info-name-edit'>
                <div className='up-info-name-div'>
                    <h2>Hi, I'm {user.firstName}</h2>
                    Joined in
                </div>
            </div>
        </div>
        <div className='user-profile-spots-wrapper'>
            <div className='up-spots-header'>
                <h3>{user.firstName}'s Spots</h3>
            </div>
            {userDetailed.Spots.Spots.map(spot => (
                <SpotItem
                    spot={spot}
                    key={spot.id}
                />
            ))}
        </div> {/* user-profile-spots-wrapper */}
        <div className='user-profile-reviews-wrapper'>
            <div className='up-reviews-header'>
                <h3>{user.firstName}'s Reviews</h3>
            </div>
            {userDetailed.Reviews.Reviews.map(review => (
                <SingleReview review={review} />
            ))}
        </div> {/* user-profile-reviews-wrapper */}
        </div> /* user-profile-wrapper */
    );
}

export default UserProfile;