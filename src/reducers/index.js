// Set up your root reducer here...
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import playerReducer from '../modules/Dashboard/reducers/playerReducer'
import additionalDancersInfoReducer from '../modules/Dashboard/reducers/additionalDancersInfoReducer'

const rootReducer = combineReducers({
    routing: routerReducer,
    auth: authReducer,
    player: playerReducer,
    additionalDancersInfo: additionalDancersInfoReducer,
})

export default rootReducer
