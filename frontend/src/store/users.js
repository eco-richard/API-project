import { csrfFetch } from "./csrf"

const GET_USERS = "users/GET_USERS"

const get = (users) => ({
    type: GET_USERS,
    users
})

export function getAllUsers() {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/users/all-users`);

        if (res.ok) {
            let users = await res.json();
            users = users.Users;
            console.log("Users: ", users);
            dispatch(get(users));
            return users;
        }
    }
}

const initialState = {};
export default function usersReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case GET_USERS:
            newState = {...state};
            const users = {}
            action.users.forEach(user => {
                users[user.id] = user
            })
            newState = users;
            return newState;
        default:
            return state;
    }
}