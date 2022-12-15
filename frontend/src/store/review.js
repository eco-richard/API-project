import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/GET_REVIEWS"
const ADD_REVIEW = "reviews/ADD_REVIEWS"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"

const get = (reviews, userId, spotId) => ({
    type: GET_REVIEWS,
    reviews,
})

export function getSpotReviews(spotId) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

        if (res.ok) {
            const reviewsJSON = await res.json();
            const reviews = reviewsJSON.Reviews;
            dispatch(get(reviews));
        }
    }
}

export function addReview(review, imgUrl, spotId) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body: JSON.stringify(review)
        })

        if (res.ok) {
            const review = res.json();
            const imgObj = {url: imgUrl};
            const imgResponse = await csrfFetch(`/api/reviews/${review.id}/images`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(imgObj)
            })
        }
    }
}
// Reviews Reducer

const initialState = {spot: {}, user: {}}
export default function reviewsReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case GET_REVIEWS:
            newState = { ...state, spot: {}, user: {}}
            const reviews = {}
            action.reviews.forEach((review) => {
                reviews[review.id] = review;
            })
            newState.spot = reviews;
            return newState;
        case ADD_REVIEW:
            newState = { ...state, spot: {...state.spot}, user: {...state.user}}
            return newState;
        default:
            return state;
    }
}