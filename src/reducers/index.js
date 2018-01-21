// Set up your root reducer here...
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import tracksReducer from './tracksReducer'

const rootReducer = combineReducers({
    routing: routerReducer,
    auth: authReducer,
    tracks: tracksReducer,
})

export default rootReducer
