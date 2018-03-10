import fetch from 'isomorphic-fetch'

import {
    FETCH_TEST_UPLOAD_REQUEST,
    FETCH_TEST_UPLOAD_SUCCESS,
    FETCH_TEST_UPLOAD_FAILED,
} from './consts'

export const fetchTestUpload = (url, data) => {
    const body = new FormData()

    body.append('file', data)
    body.append('name', 'test.file')

    return dispatch => {
        dispatch({
            type: FETCH_TEST_UPLOAD_REQUEST,
        })

        return fetch(url, {
            method: 'POST',
            body,
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
            .then(res => dispatch({
                type: FETCH_TEST_UPLOAD_SUCCESS,
                payload: res,
            }))
            .catch(e => {
                dispatch({
                    type: FETCH_TEST_UPLOAD_FAILED,
                    payload: e,
                })
            })
    }
}
