import fetch from 'isomorphic-fetch'

import {
    FETCH_TRACKS_REQUEST,
    FETCH_TRACKS_SUCCESS,
    FETCH_TRACKS_FAILED,
    FETCH_UPDATE_TRACK_REQUEST,
    FETCH_UPDATE_TRACK_SUCCESS,
    FETCH_UPDATE_TRACK_FAILED,
    FETCH_DELETE_TRACK_REQUEST,
    FETCH_DELETE_TRACK_SUCCESS,
    FETCH_DELETE_TRACK_FAILED,
} from './const'

export const fetchTracksRequest = () => {
    return dispatch => {
        dispatch({
            type: FETCH_TRACKS_REQUEST,
        })

        return fetch('/player/list/')
            .then(r => {
                if (r.status !== 200) {
                    throw ({
                        code: r.status,
                        message: r.statusText,
                    })
                }

                return r.json()
            })
            .then(res => dispatch({
                type: FETCH_TRACKS_SUCCESS,
                payload: res,
            }))
            .catch(e => {
                dispatch({
                    type: FETCH_TRACKS_FAILED,
                    payload: e,
                })
            })
    }
}

export const updateTrackRequest = (track, onFulfiled = () => {}, onReject = () => {}) => {
    return dispatch => {
        dispatch({
            type: FETCH_UPDATE_TRACK_REQUEST,
        })

        return fetch('/player/update/', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${sessionStorage.auth_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(track),
        })
            .then(r => {
                if (r.status !== 200) {
                    throw ({
                        code: r.status,
                        message: r.statusText,
                    })
                }

                return r.json()
            })
            .then(res => {
                onFulfiled()
                dispatch({
                    type: FETCH_UPDATE_TRACK_SUCCESS,
                    payload: res,
                })
            })
            .catch(e => {
                onReject()
                dispatch({
                    type: FETCH_UPDATE_TRACK_FAILED,
                    payload: e,
                })
            })
    }
}

export const deleteTrackRequest = (id, onFulfiled = () => {}, onReject = () => {}) => {
    return dispatch => {
        dispatch({
            type: FETCH_DELETE_TRACK_REQUEST,
        })

        return fetch(`/player/deleteById/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.auth_token}`,
            },
        })
            .then(r => {
                if (r.status !== 200) {
                    throw ({
                        code: r.status,
                        message: r.statusText,
                    })
                }

                return r.json()
            })
            .then(res => {
                onFulfiled()
                dispatch({
                    type: FETCH_DELETE_TRACK_SUCCESS,
                    payload: res,
                })
            })
            .catch(e => {
                onReject()
                dispatch({
                    type: FETCH_DELETE_TRACK_FAILED,
                    payload: e,
                })
            })
    }
}
