import { ACTION_TYPES } from "../action/types"
const initialState = {
    token: "",
    isAuthenticated: false,
    errorMsg: ""
}

export const authReduser = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.AUTH_SIGNUP:
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                errorMsg: ""
            }

        default:
            return state
    }
}