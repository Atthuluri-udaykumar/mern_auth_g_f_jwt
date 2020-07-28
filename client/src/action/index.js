import axios from "axios"
import { ACTION_TYPES } from "./types"

export const signUp = (data) => {
    return async dispatch => {
        try {
            let res = await axios.post("http://localhost:5000/users/signup", data)
            console.log(res);
            dispatch({
                type: ACTION_TYPES.AUTH_SIGNUP,
                payload: res.data.token,
            });


            if (res.data.msg !== undefined) {
                alert(res.data.msg)
            }
            localStorage.setItem("JWT_TOKEN", res.data.token)
        } catch (err) {
            console.log(123);
        }

    }
}