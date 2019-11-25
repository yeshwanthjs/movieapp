import { call, takeLatest, put, fork } from "redux-saga/effects";
import { getMovies } from "./api/getMovies";
import { getMoviesSuccess } from "./actions/getMoviesAction";

export function* getMoviesRequest() {
  const result = yield call(getMovies);
  yield put(getMoviesSuccess(result.data));
}

function* watchGetMovies() {
  yield takeLatest("GET_MOVIES_REQUEST", getMoviesRequest);
}

export default function* rootSaga() {
  yield fork(watchGetMovies);
}
