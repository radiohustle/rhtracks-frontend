import decode from 'jwt-decode'
import { FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILED } from '../modules/Auth/const'

const getState = (token) => {
    if (token) {
        const decodedData = decode(token)

        return {
            fetching: false,
            error: null,
            username: decodedData.username,
            token,
        }
    } else {
        return {
            fetching: false,
        }
    }
}

const authReducer = (state = getState(sessionStorage.auth_token), action) => {
    if (action.type === FETCH_LOGIN_REQUEST) {
        return {
            ...state,
            fetching: true,
        }
    }

    if (action.type === FETCH_LOGIN_SUCCESS) {
        const { token } = action.payload

        sessionStorage.auth_token = token

        const newState = getState(token)

        return {
            ...state,
            ...newState,
        }
    }

    if (action.type === FETCH_LOGIN_FAILED) {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        }
    }

    return {
        ...state
    }
}

export default authReducer
