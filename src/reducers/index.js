// Set up your root reducer here...
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import playerReducer from '../modules/Dashboard/reducers/playerReducer'
import customDataReducer from '../modules/Dashboard/reducers/customDataReducer'

const rootReducer = combineReducers({
    routing: routerReducer,
    auth: authReducer,
    player: playerReducer,
    custom: customDataReducer,
})

export default rootReducer
