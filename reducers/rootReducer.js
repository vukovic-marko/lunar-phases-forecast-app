import { combineReducers } from 'redux';

import moonReducer from './moonReducer'
import preferenceReducer from './preferenceReducer'

const rootReducer = combineReducers({
    moon: moonReducer,
    preference: preferenceReducer
})

export default rootReducer;