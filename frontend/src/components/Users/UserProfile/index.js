import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser } from '../../../store/users';
import './UserProfile.css'

function UserProfile({ user }) {
    const dispatch = useDispatch();
    let userDetailed = useSelector(state => state.users.singleUser);
    useEffect(() => {
        dispatch(getSingleUser(user))
    }, [dispatch])
    console.log("User Profile User: ", user)
    console.log("User Profile User Detailed: ", userDetailed);

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

        </div> {/* user-profile-spots-wrapper */}
        <div className='user-profile-reviews-wrapper'>

        </div> {/* user-profile-reviews-wrapper */}
        </div> /* user-profile-wrapper */
    );
}

export default UserProfile;