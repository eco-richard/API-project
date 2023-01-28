import { csrfFetch } from "./csrf";

const GET_BOOKINGS = "bookings/GET_BOOKINGS"
const ADD_BOOKING = "bookings/ADD_BOOKING"
const UPDATE_BOOKING = "bookings/UPDATE_BOOKING"
const DELETE_BOOKING = "bookings/DELETE_BOOKING"

const get = (bookings) => ({
    type: GET_BOOKINGS,
    bookings,
})

const add = (booking, spotId) => ({
    type: ADD_BOOKING,
    booking,
    spotId
})

const update = (booking, spotId) => ({
    type: UPDATE_BOOKING,
    booking,
    spotId,
})

const remove = (booking) => ({
    type: DELETE_BOOKING,
    booking
})

export function getSpotBookings(spotId) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

        if (res.ok) {
            const bookings = await res.json();
            dispatch(get(bookings));
            return bookings;
        }
    }
}

const initialState = {user : {}, spot: {}}
export default function bookingsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_BOOKINGS:
            newState = {...state, spot: {}, user: {}}
            const bookings = {}
            action.bookings.forEach(booking => {
                bookings[booking.id] = booking
            }) 
            newState.spot = bookings;
            return newState;
        case ADD_BOOKING:

        case UPDATE_BOOKING:

        case DELETE_BOOKING:

        default:
            return state;
    }
}