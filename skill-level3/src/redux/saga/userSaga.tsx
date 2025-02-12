import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { UserData } from "../../types/userService";
import { calculateDaysToBirthday } from "../../utils/dateUtils";
import {
  setDaysToBirthday,
  setError,
  setLoading,
  setUserImage,
  updateUser,
} from "../userSlice";

const API_URL = "https://dummyjson.com/users";

// Fonction pour récupérer les données utilisateur
const fetchUserData = async (
  firstName: string,
  lastName: string
): Promise<UserData | null> => {
  try {
    const query = firstName ? firstName : lastName;
    const response = await axios.get(`${API_URL}/search?q=${query}`);
    return (
      response.data.users?.find(
        (user: UserData) =>
          user.firstName.toLowerCase() === firstName.toLowerCase() &&
          user.lastName.toLowerCase() === lastName.toLowerCase()
      ) || null
    );
  } catch (error) {
    console.error("Error fetching user data", error);
    throw new Error("Erreur lors de la récupération des données");
  }
};

// Saga pour gérer la requête utilisateur
function* fetchUserSaga(action: ReturnType<typeof updateUser>) {
  try {
    yield put(setLoading(true));

    const { firstName, lastName, birthDate } = action.payload;

    if (birthDate) {
      const daysToBirthday = calculateDaysToBirthday(birthDate);
      yield put(setDaysToBirthday(daysToBirthday));
    }
    if (!firstName || !lastName) {
      yield put(setError("Nom ou prénom manquant"));
      return;
    } else {
      const user: UserData | null = yield call(
        fetchUserData,
        firstName,
        lastName
      );
      const userImage = user?.image || "/no_image_available.png";
      yield put(setUserImage(userImage));
      yield put(setLoading(false));
    }
  } catch (error) {
    yield put(setError((error as Error).message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchUserSaga() {
  yield takeLatest(updateUser.type, fetchUserSaga);
}
