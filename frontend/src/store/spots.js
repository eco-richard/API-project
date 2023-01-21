
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

const remove = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

// Thunk Action Creators

export function getSpots() {
    return async (dispatch) => {
        const res = await csrfFetch("/api/spots");

        if (res.ok) {
            let spots = await res.json()
            spots = spots.Spots;
            dispatch(get(spots))
            return spots;
        }
    }
}

export function getSingleSpot(spotId) {
    return async (dispatch) => {
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


export function addSpot(spot, imgUrl) {
    return async (dispatch) => {
        const res = await csrfFetch("/api/spots", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(spot)
        });


        if (res.ok) {
            const spot = await res.json();
            const imgObject = {url: imgUrl, preview: true};
            const imgResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: "POST",
                body: JSON.stringify(imgObject)
            })
            dispatch(add(spot));
            spot.avgRating = null;
            return spot;
        }
    }
};

export function updateSpot(spotData, spotId) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(spotData)
        })

        if (res.ok) {
            const spot = await res.json();
            dispatch(update(spot))
            return spot;
        }
    }
}

export function deleteSpot(spotId) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            const spots = await res.json();
            dispatch(remove(spotId))
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
            newState = {...state, allSpots: {...state.allSpots}}
            newState.allSpots[action.spot.id] = action.spot
            return newState;
        case UPDATE_SPOT:
            newState = {...state, singleSpot : {}}
            newState.singleSpot = action.spot;
            return newState;
        case DELETE_SPOT:
            newState = { ...state, allSpots: {...state.allSpots}, singleSpot: {} }
            delete newState.allSpots[action.spotId];
            return newState;
        default:
            return state;
    }
}