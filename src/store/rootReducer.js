import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import locationReducer from "./reducers/locationReducer";
export default combineReducers ({
    userReducer,
    locationReducer
})
