import * as actionTypes from '../constants';

const iniatialState = {};

const weatherReducer = (state = iniatialState, action) => {
    switch (action.type) {
        case actionTypes.WEATHER:
            return {
                ...state,
                loading: true,
                
            }
        case actionTypes.WEATHER_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
            }
        case actionTypes.WEATHER_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        default:
            return state;
    }
}
export default weatherReducer;