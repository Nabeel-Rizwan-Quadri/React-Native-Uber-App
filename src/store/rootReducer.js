import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import locationReducer from "./reducers/locationReducer";
import requestTripReducer from "./reducers/requestTripReducer";

export default combineReducers ({
    userReducer,
    locationReducer,
    requestTripReducer
})
