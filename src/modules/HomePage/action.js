import fetch from 'isomorphic-fetch'

import { FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS, FETCH_TRACKS_FAILED } from './const'

export const fetchTracksRequest = () => {
    return dispatch => {
        dispatch({
            type: FETCH_TRACKS_REQUEST,
        })

        return fetch('/player/list')
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
