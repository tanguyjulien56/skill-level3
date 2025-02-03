import { combineReducers } from "redux";
import formReducer from "./formSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  form: formReducer, // Utilise le reducer du formulaire
  user: userReducer, // Reducer pour l'utilisateur
});

export default rootReducer;
