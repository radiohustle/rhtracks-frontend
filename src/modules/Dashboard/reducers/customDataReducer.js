import { NotificationManager } from 'react-notifications'

import {
    FETCH_LAST_COMPETITIONS_REQUEST,
    FETCH_LAST_COMPETITIONS_SUCCESS,
    FETCH_LAST_COMPETITIONS_FAILED,
} from '../consts/customDataConsts'

const initialState = {
    error: null,
    fetchingLatestUpdate: false,
    latestDate: '',
    latestContests: [],
}

const configReducer = (state = initialState, action) => {
    // Last competitions

    if (action.type === FETCH_LAST_COMPETITIONS_REQUEST) {
        return {
            ...state,
            error: null,
            fetchingLatestUpdate: true,
        }
    }

    if (action.type === FETCH_LAST_COMPETITIONS_SUCCESS) {
        return {
            ...state,
            error: null,
            fetchingLatestUpdate: false,
            latestDate: action.payload.date,
            latestContests: action.payload.contests,
        }
    }

    if (action.type === FETCH_LAST_COMPETITIONS_FAILED) {
        const error = action.payload

        NotificationManager.error(`${error.code} ${error.message}: can not load last competitions`)

        return {
            ...state,
            error,
            fetchingLatestUpdate: false,
        }
    }

    // Default

    return {
        ...state,
    }
}

export default configReducer
