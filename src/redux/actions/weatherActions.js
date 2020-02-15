import * as types from '../constants';

export const fetchWeather = (query) => ({
    type: types.WEATHER,
    query
});

export const fetchWeatherSuccess = (data) => ({
    type: types.WEATHER_SUCCESS,
    data
});

export const fetchWeatherFailure = (error) => ({
    type: types.WEATHER_FAILURE,
    error
});