import { CALCULATE, CLEAR } from '../actions/actionTypes'

import Moon from '../lib/moonlib'

const initialState = {
    data: {
        moonphase: null,
        moonrise: null,
        moonset: null,
        updated: null
    }
}

const moonReducer = (state = initialState, action) => {
    switch(action.type) {
        case CALCULATE: {
            let [c,e,latitude,longitude] = action.payload;
            let data = Moon.moon(c,e,latitude,longitude)
            
            return {
                ...state,
                data: {
                    ...state.data,
                    moonrise: data[0].moonrise,
                    moonset: data[0].moonset,
                    moonphase: data[0].moonphase,
                    updated: new Date(),
                    forecast: data.slice(1)
                }
            }
        
        }
        case CLEAR: {
            return {
                ...state,
                data: {
                    ...state.data,
                    moonrise: null,
                    moonset: null,
                    moonphase: null,
                    updated: null,
                    forecast: null
                }
            }
        }
        default:
            return state;
    }
}

export default moonReducer;