import { combineReducers } from "redux";
import formReducer from "./formSlice"; 

const rootReducer = combineReducers({
  form: formReducer, // Utilise le reducer du formulaire
});

export default rootReducer;
