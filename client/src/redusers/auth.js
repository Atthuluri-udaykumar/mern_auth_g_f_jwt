import { ACTION_TYPES } from "../action/types"
const initialstate = {
    tokens: "",
    isAuthenticated: false,
    errorMsg: ""
}

export const authReduser = (state = initialstate, action) => {
    switch (action.type) {
        case ACTION_TYPES.AUTH_SIGNUP:
            // console.log(errorMsg);
            return {
                ...state,
                tokens: action.payload,
                isAuthenticated: true,
                errorMsg: ""
            }
        case ACTION_TYPES.AUTH_SIGNOUT:

            return {
                ...state,
                tokens: action.payload,
                isAuthenticated: false,
                errorMsg: ""
            }
        case ACTION_TYPES.AUTH_ERROR:

            return {
                ...state,
                tokens: "",
                isAuthenticated: true,
                errorMsg: action.payload
            }
        default:

            return state;
    }
}