import { all } from 'redux-saga/effects';

import { watchWeatherSagaAsync } from './weatherSaga';

function* rootSaga() {
  yield all([
    watchWeatherSagaAsync()
  ]);
}
export default rootSaga;