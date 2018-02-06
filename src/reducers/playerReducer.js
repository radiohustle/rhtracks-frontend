import { NotificationManager } from 'react-notifications'

import {
    FETCH_DELETE_TRACK_FAILED, FETCH_DELETE_TRACK_REQUEST,
    FETCH_DELETE_TRACK_SUCCESS,
    FETCH_TRACKS_FAILED,
    FETCH_TRACKS_REQUEST,
    FETCH_TRACKS_SUCCESS, FETCH_UPDATE_TRACK_FAILED, FETCH_UPDATE_TRACK_REQUEST,
    FETCH_UPDATE_TRACK_SUCCESS,
} from '../modules/Dashboard/const'

const initialState = {
    fetching: false,
    error: null,
    tracks: [],
    fetchingUpdate: false,
    fetchingDelete: false,
}

const tracksReducer = (state = initialState, action) => {
    // Track list

    if (action.type === FETCH_TRACKS_REQUEST) {
        return {
            ...state,
            fetching: true,
            error: null,
        }
    }

    if (action.type === FETCH_TRACKS_SUCCESS) {
        return {
            ...state,
            fetching: false,
            error: null,
            tracks: action.payload,
        }
    }

    if (action.type === FETCH_TRACKS_FAILED) {
        const error = action.payload

        NotificationManager.error(`${error.code} ${error.message}: can not load track list`)

        return {
            ...state,
            fetching: false,
            error,
        }
    }

    // Update track

    if (action.type === FETCH_UPDATE_TRACK_REQUEST) {
        return {
            ...state,
            fetchingUpdate: true,
        }
    }

    if (action.type === FETCH_UPDATE_TRACK_SUCCESS) {
        NotificationManager.success('Track is saved')

        return {
            ...state,
            error: null,
            fetchingUpdate: false,
        }
    }

    if (action.type === FETCH_UPDATE_TRACK_FAILED) {
        const error = action.payload

        NotificationManager.error(`${error.code} ${error.message}: can not update track`)

        return {
            ...state,
            error,
            fetchingUpdate: false,
        }
    }

    // Delete track

    if (action.type === FETCH_DELETE_TRACK_REQUEST) {
        return {
            ...state,
            fetchingDelete: true,
        }
    }

    if (action.type === FETCH_DELETE_TRACK_SUCCESS) {
        NotificationManager.success('Track is deleted')

        return {
            ...state,
            error: null,
            fetchingDelete: false,
        }
    }

    if (action.type === FETCH_DELETE_TRACK_FAILED) {
        const error = action.payload

        NotificationManager.error(`${error.code} ${error.message}: can not delete track`)

        return {
            ...state,
            error,
            fetchingDelete: false,
        }
    }

    return {
        ...state,
    }
}

export default tracksReducer
