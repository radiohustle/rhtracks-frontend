import { FETCH_TRACKS_FAILED, FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS } from '../modules/Dashboard/const'

const initialState = {
    fetching: false,
    tracks: [],
}

const tracksReducer = (state = initialState, action) => {
    if (action.type === FETCH_TRACKS_REQUEST) {
        return {
            ...state,
            fetching: true,
        }
    }

    if (action.type === FETCH_TRACKS_SUCCESS) {
        return {
            ...state,
            fetching: false,
            tracks: action.payload,
        }
    }

    if (action.type === FETCH_TRACKS_FAILED) {
        return {
            ...state,
            fetching: false,
        }
    }

    return {
        ...state
    }
}

export default tracksReducer
