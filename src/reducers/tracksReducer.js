import { FETCH_TRACKS } from '../modules/HomePage/const'

const tracksReducer = (state, action) => {
    if (action.type === FETCH_TRACKS) {
        alert(FETCH_TRACKS)

        return {
            ...state
        }
    }

    return {
        ...state
    }
}

export default tracksReducer
