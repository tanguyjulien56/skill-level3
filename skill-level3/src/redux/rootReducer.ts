import { combineReducers } from "redux";

import userReducer from "./userSlice";

const rootReducer = combineReducers({
  user: userReducer, // Reducer pour l'utilisateur
});

export default rootReducer;
