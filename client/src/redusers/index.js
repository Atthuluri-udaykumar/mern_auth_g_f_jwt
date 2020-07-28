import { combineReducers } from "redux";
import { authReduser } from "./auth"

export default combineReducers({
    auth: authReduser
})