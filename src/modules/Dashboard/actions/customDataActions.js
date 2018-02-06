import fetch from 'isomorphic-fetch'

import {
    FETCH_LAST_COMPETITIONS_REQUEST,
    FETCH_LAST_COMPETITIONS_SUCCESS,
    FETCH_LAST_COMPETITIONS_FAILED,
} from '../consts/customDataConsts'

export const fetchLastCompetitionsRequest = () => {
    return dispatch => {
        dispatch({
            type: FETCH_LAST_COMPETITIONS_REQUEST,
        })

        return fetch('/custom/latest_update/')
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
                type: FETCH_LAST_COMPETITIONS_SUCCESS,
                payload: res,
            }))
            .catch(e => {
                dispatch({
                    type: FETCH_LAST_COMPETITIONS_FAILED,
                    payload: e,
                })
            })
    }
}
