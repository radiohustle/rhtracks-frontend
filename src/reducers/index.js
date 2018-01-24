// Set up your root reducer here...
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import playerReducer from './playerReducer'

const rootReducer = combineReducers({
    routing: routerReducer,
    auth: authReducer,
    player: playerReducer,
})

export default rootReducer
