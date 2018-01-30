import fetch from 'isomorphic-fetch'

import {
    FETCH_TRACKS_REQUEST,
    FETCH_TRACKS_SUCCESS,
    FETCH_TRACKS_FAILED,
    FETCH_UPDATE_TRACK_REQUEST,
    FETCH_UPDATE_TRACK_SUCCESS,
    FETCH_UPDATE_TRACK_FAILED,
} from './const'

export const fetchTracksRequest = () => {
    return dispatch => {
        dispatch({
            type: FETCH_TRACKS_REQUEST,
        })

        return fetch('/player/list/')
            .then(r => {
                if (r.status !== 200) {
                    dispatch({
                        type: FETCH_TRACKS_FAILED,
                        payload: {
                            code: r.status,
                            text: r.statusText,
                        },
                    })
                } else {
                    return r.json()
                }
            })
            .then(res => dispatch({
                type: FETCH_TRACKS_SUCCESS,
                payload: res,
            }))
    }
}

export const updateTrackRequest = (track) => {
    return dispatch => {
        dispatch({
            type: FETCH_UPDATE_TRACK_REQUEST,
        })

        return fetch('/player/update/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(track),
        })
            .then(r => {
                if (r.status !== 200) {
                    dispatch({
                        type: FETCH_UPDATE_TRACK_FAILED,
                        payload: {
                            code: r.status,
                            text: r.statusText,
                        },
                    })
                } else {
                    return r.json()
                }
            })
            .then(res => dispatch({
                type: FETCH_UPDATE_TRACK_SUCCESS,
                payload: res,
            }))
    }
}
