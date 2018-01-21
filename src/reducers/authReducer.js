import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILED } from '../modules/Auth/const'

const initialState = {
    token: sessionStorage.auth_token
}

const authReducer = (state = initialState, action) => {
    if (action.type === FETCH_LOGIN_SUCCESS) {
        const { token } = action.payload

        sessionStorage.auth_token = token

        return {
            ...state,
            token,
        }
    }

    if (action.type === FETCH_LOGIN_FAILED) {
        return {
            ...state,
            error: action.payload,
        }
    }

    return {
        ...state
    }
}

export default authReducer
