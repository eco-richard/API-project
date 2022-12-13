
import { csrfFetch } from "./csrf"; // Fetch data from the backend server

// Spot actions
const ADD_SPOT = "spots/ADD_SPOT"
const READ_SPOT = "spots/READ_SPOT"
const UPDATE_SPOT = "spots/UPDATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"

// 

const initialState = {};

export function addSpot(spot) {
    return spot;
};

export default function spotsReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case ADD_SPOT:
            newState = { ...state }
            return newState;
        case READ_SPOT:
            return newState;
        case UPDATE_SPOT:
            return newState;
        case DELETE_SPOT:
            return newState;
        default:
            return state;
    }
}