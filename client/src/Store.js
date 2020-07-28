import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./redusers/index"
export const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk))

);