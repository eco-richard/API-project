
import { csrfFetch } from "./csrf"; // Fetch data from the backend server

// Spot action typedefs
const GET_SPOTS = "spots/GET_SPOTS"
const GET_SPOT = "spots/GET_SPOT"
const ADD_SPOT = "spots/ADD_SPOT"
const UPDATE_SPOT = "spots/UPDATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"

const get = (spots) => ({
    type: GET_SPOTS,
    spots
})

const getSpot = (spot) => ({
    type: GET_SPOT,
    spot
})

const add = (spot) => ({
    type: ADD_SPOT,
    spot
});

const update = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

const remove = (spot) => ({
    type: DELETE_SPOT,
    spot
})

// Thunk Action Creators

export function getSpots() {
    return async (dispatch) => {
        const res = await csrfFetch("/api/spots");

        if (res.ok) {
            let spots = await res.json()
            spots = spots.Spots;
            // console.log("Spots from getSpots()", spots);
            dispatch(get(spots))
            return spots;
        }
    }
}

export function getSingleSpot(spotId) {
    return async (dispatch) => {
        console.log("SpotId: ", spotId)
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: "GET"
        });

        if (res.ok) {
            let spot = await res.json()
            dispatch(getSpot(spot))
            return spot;
        }
    }
}


export function addSpot(spot) {
    return async (dispatch) => {
        const res = await csrfFetch("/api/spots", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(spot)
        });

        if (res.ok) {
            const spots = await res.json();
            dispatch(add(spots));
            return spots;
        }
    }
};

export function updateSpot(spot) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spot.id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(spot)
        })

        if (res.ok) {
            const spots = await res.json();
            dispatch(update(spots))
            return spots;

        }
    }
}

export function deleteSpot(spot) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spot.id}`, {
            method: "DELETE"
        })

        if (res.ok) {
            const spots = await res.json();
            dispatch(remove(spots))
            return spots;
        }
    }
}

const initialState = {allSpots: {}, singleSpot: {}};

export default function spotsReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case GET_SPOTS: 
            newState = { allSpots: {}, singleSpot: {} }
            const allSpotstmp = {...action.spots};
            newState.allSpots = allSpotstmp;
            return newState;
        case GET_SPOT:
            newState = {...state, singleSpot: {}}
            newState.singleSpot = action.spot;
            return newState;
        case ADD_SPOT:
            newState[action.spots.spot.id] = action.spot.spot
            return newState;
        case UPDATE_SPOT:
            delete newState.action.spot;
            return newState;
        case DELETE_SPOT:
            newState = { ...state }
            delete newState.action.spot;
            return newState;
        default:
            return state;
    }
}