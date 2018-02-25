import { NotificationManager } from 'react-notifications'

import {
    FETCH_LAST_COMPETITIONS_REQUEST,
    FETCH_LAST_COMPETITIONS_SUCCESS,
    FETCH_LAST_COMPETITIONS_FAILED,
    FETCH_SAVE_ADDITIONAL_DANCERS_INFO_REQUEST,
    FETCH_SAVE_ADDITIONAL_DANCERS_INFO_SUCCESS,
    FETCH_SAVE_ADDITIONAL_DANCERS_INFO_FAILED,
} from '../consts/additionalDancersInfoConsts'

const initialState = {
    error: null,
    fetchingData: false,
    data: {
        lastCompetition: {},
        pics: [],
        links: {},
    },
}

const configReducer = (state = initialState, action) => {
    if (action.type === FETCH_LAST_COMPETITIONS_REQUEST) {
        return {
            ...state,
            error: null,
            fetchingData: true,
        }
    }

    if (action.type === FETCH_LAST_COMPETITIONS_SUCCESS) {
        return {
            ...state,
            error: null,
            data: action.payload,
            fetchingData: false,
        }
    }

    if (action.type === FETCH_LAST_COMPETITIONS_FAILED) {
        const error = action.payload

        NotificationManager.error(`${error.code} ${error.message}: can not load last competitions`)

        return {
            ...state,
            error,
            data: initialState.data,
            fetchingData: false,
        }
    }

    if (action.type === FETCH_SAVE_ADDITIONAL_DANCERS_INFO_REQUEST) {
        return {
            ...state,
        }
    }

    if (action.type === FETCH_SAVE_ADDITIONAL_DANCERS_INFO_SUCCESS) {
        return {
            ...state,
        }
    }

    if (action.type === FETCH_SAVE_ADDITIONAL_DANCERS_INFO_FAILED) {
        const error = action.payload

        NotificationManager.error(`${error.code} ${error.message}: can not save additional dancers info`)

        return {
            ...state,
            error,
        }
    }

    // Default

    return {
        ...state,
    }
}

export default configReducer
