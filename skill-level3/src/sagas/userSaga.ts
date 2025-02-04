import { call, put, takeEvery } from "redux-saga/effects";
import { fetchUserSuccess, fetchUserFailure } from "../redux/userSlice";
import axios from "axios";

function* fetchUserData(action) {
  try {
    const response = yield call(axios.get, `https://dummyjson.com/users/${action.payload}`);
    yield put(fetchUserSuccess(response.data)); // Si succès, on met à jour les données
  } catch (error) {
    yield put(fetchUserFailure(error.message)); // Si erreur, on l'attrape
  }
}

export function* watchFetchUserData() {
  yield takeEvery("user/fetchUserRequest", fetchUserData);
}