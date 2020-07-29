import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./redusers/index"
import axios from "axios"

const jwt_token = localStorage.getItem("JWT_TOKEN");
axios.defaults.headers.common["Authorization"] = jwt_token;//satting the header in the front end to get auth routes in back end

export const store = createStore(
    rootReducer,
    {
        initialstate: {
            tokens: jwt_token,
            isAuthenticated: jwt_token ? true : false
        }
    },
    compose(applyMiddleware(thunk))
    lkajfs
);