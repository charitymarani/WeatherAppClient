import { put, takeLatest, call } from 'redux-saga/effects';
import WeatherAPI from '../../services/weatherAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchWeather,
  fetchWeatherSuccess,
  fetchWeatherFailure
} from '../actions/weatherActions';

export function* watchWeatherSagaAsync() {
  yield takeLatest(fetchWeather().type, WeatherSagaAsync);
}

export function* WeatherSagaAsync(action) {
  try{
    const response = yield call(WeatherAPI.getWeather, action.query);
    yield put(fetchWeatherSuccess(response.data));
  }catch(error) {
    const errorMsg= apiErrorHandler(error);
    yield put(fetchWeatherFailure(errorMsg));

  }

}