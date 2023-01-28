import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/GET_REVIEWS"
const ADD_REVIEW = "reviews/ADD_REVIEW"
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"

const get = (reviews) => ({
    type: GET_REVIEWS,
    reviews,
})

const add = (review, spotId) => ({
    type: ADD_REVIEW,
    review,
    spotId
})

const update = (review, spotId) => ({
    type: UPDATE_REVIEW,
    review,
    spotId
})

const remove = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
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

export function addReview(review, spotId) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body: JSON.stringify(review)
        })

        if (res.ok && res.statusCode === 200) {
            const review = res.json();
            // const imgObj = {url: imgUrl};
            // const imgResponse = await csrfFetch(`/api/reviews/${review.id}/images`, {
            //     method: "POST",
            //     headers: {"Content-Type": "application/json"},
            //     body: JSON.stringify(imgObj)
            // })
            dispatch(add(review, spotId))
        } else if (res.statusCode === 403) {
            return "Forbidden";
        }
    }
}

export function updateReview(review, reviewId, spotId) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews/${reviewId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(review)
        })

        if (res.ok) {
            const review = res.json();
            dispatch(update(review, spotId));
        }
    }
}

export function deleteReview({reviewId}) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            const response = res.json();
            dispatch(remove(reviewId))
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
        case UPDATE_REVIEW:
            newState = { ...state, spot: {...state.spot}, user: {...state.user}}
            newState.spot[action.review.id] = action.review
            return newState;
        case DELETE_REVIEW:
            newState = { ...state, spot: {...state.spot}, user: {...state.user}};
            delete newState.spot[action.reviewId]
            return newState;
        default:
            return state;
    }
}