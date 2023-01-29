import { csrfFetch } from "./csrf"

const GET_USERS = "users/GET_USERS";
const GET_SINGLE_USER = "users/GET_SINGLE_USER";

const get = (users) => ({
    type: GET_USERS,
    users
})

const getSingle = (user) => ({
    type: GET_SINGLE_USER,
    user
})

export function getAllUsers() {
    return async (dispatch) => {
        const allUsersResponse = await csrfFetch(`/api/users/all-users`);

        if (!allUsersResponse.ok) {
            throw new Error("Error fetching all users.")
        }
        let users = await allUsersResponse.json();
        users = users.Users;
        console.log("Users from getAllUsers: ", users);
        dispatch(get(users));
        return users;
    }
}

export function getSingleUser(user) {
    return async (dispatch) => {
        let singleUserResponse = await csrfFetch(`/api/users/user-details/${user.id}`);
        
        if (!singleUserResponse.ok) {
            throw new Error("Error fetching user details");
        }
        let userDetailed = await singleUserResponse.json();
        let userSpotsResponse = await csrfFetch(`/api/spots/current`)

        if (!userSpotsResponse.ok) {
            throw new Error("Error fetching user owned spot details");
        }
        let userSpots = await userSpotsResponse.json();
        userDetailed.User.Spots = userSpots;
        let userReviewsResponse = await csrfFetch(`/api/reviews/current`);
        if (!userReviewsResponse.ok) {
            throw new Error("Error fetching user review details"); 
        }

        let userReviews = await userReviewsResponse.json();
        userDetailed.User.Reviews = userReviews;
        let userBookingsResponse = await csrfFetch(`/api/bookings/current`);
        if (!userBookingsResponse.ok) {
            throw new Error("Error fetching user bookings details");
        }
        let userBookings = await userBookingsResponse.json();
        userDetailed.User.Bookings = userBookings;
        console.log("User from getSingleUser: ", userDetailed);
        dispatch(getSingle(userDetailed.User));
        return user;
    }
}

const initialState = {allUsers : {}, singleUser: {}};
export default function usersReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case GET_USERS:
            newState = {...state, allUsers: {}, singleUser: {}};
            const users = {}
            action.users.forEach(user => {
                users[user.id] = user
            })
            newState.allUsers = users;
            return newState;
        case GET_SINGLE_USER:
            newState = {...state, allUsers: {...state.allUsers}, singleUser: {}};
            newState.singleUser = action.user;
            return newState;
        default:
            return state;
    }
}