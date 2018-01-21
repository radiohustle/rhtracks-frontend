import fetch from 'isomorphic-fetch'

import { FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILED } from './const'

export const fetchLoginRequest = ({ username, password }) => {
    return dispatch => {
        dispatch({
            type: FETCH_LOGIN_REQUEST,
            payload: {
                username,
                password,
            }
        })

        const form = new FormData()

        form.append('_username', username)
        form.append('_password', password)

        return fetch('/api/login_check', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            // },
            body: form
        })
            .then(r => r.json())
            .then(res => dispatch({
                type: FETCH_LOGIN_SUCCESS,
                payload: res,
            }))
            .catch(e => dispatch({
                type: FETCH_LOGIN_FAILED,
                payload: e,
            }))
    }
}
