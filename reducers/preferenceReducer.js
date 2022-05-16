import { SET_TIME_FORMAT, SET_THEME } from '../actions/actionTypes'

const initialState = {
    preferences: {
        timeFormat: 24,
        theme: 'automatic'
    }
}

const preferenceReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_TIME_FORMAT: {
            return {
                ...state,
                preferences: {
                    ...state.preferences,
                    timeFormat: action.payload
                }
            }
        }
        case SET_THEME: {
            return {
                ...state,
                preferences: {
                    ...state.preferences,
                    theme: action.payload
                }
            }
        }
        default:
            return state;
    }
}

export default preferenceReducer;