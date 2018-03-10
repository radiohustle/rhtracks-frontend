import fetch from 'isomorphic-fetch'

import {
    FETCH_LAST_COMPETITIONS_REQUEST,
    FETCH_LAST_COMPETITIONS_SUCCESS,
    FETCH_LAST_COMPETITIONS_FAILED,
    FETCH_SAVE_ADDITIONAL_DANCERS_INFO_REQUEST,
    FETCH_SAVE_ADDITIONAL_DANCERS_INFO_SUCCESS,
    FETCH_SAVE_ADDITIONAL_DANCERS_INFO_FAILED,
} from '../consts/additionalDancersInfoConsts'

export const fetchLastCompetitionsRequest = () => {
    return dispatch => {
        dispatch({
            type: FETCH_LAST_COMPETITIONS_REQUEST,
        })

        return fetch('/db/dancers_config')
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
                console.log(JSON.parse(res))

                return dispatch({
                    type: FETCH_LAST_COMPETITIONS_SUCCESS,
                    payload: JSON.parse(res),
                })
            })
            .catch(e => {
                dispatch({
                    type: FETCH_LAST_COMPETITIONS_FAILED,
                    payload: e,
                })
            })
    }
}

export const fetchSaveAdditionalDancersInfo = json => {
    return dispatch => {
        dispatch({
            type: FETCH_SAVE_ADDITIONAL_DANCERS_INFO_REQUEST,
        })

        return fetch('/db/set_dancers_config/', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
            body: JSON.stringify({ dancers_config: JSON.stringify(json) }),
        })
            .then(r => {
                console.log(r.status)
                if (r.status !== 200) {
                    throw ({
                        code: r.status,
                        message: r.statusText,
                    })
                }

                return r.json()
            })
            .then(res => dispatch({
                type: FETCH_SAVE_ADDITIONAL_DANCERS_INFO_SUCCESS,
                payload: res,
            }))
            .catch(e => {
                dispatch({
                    type: FETCH_SAVE_ADDITIONAL_DANCERS_INFO_FAILED,
                    payload: e,
                })
            })
    }
}
