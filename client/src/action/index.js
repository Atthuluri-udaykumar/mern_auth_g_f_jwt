import axios from "axios"
import { ACTION_TYPES } from "./types"

export const signUp = (data) => {
    return async dispatch => {
        try {
            let res = await axios.post("http://localhost:5000/users/signup", data)
            // console.log(res);
            if (!res.data.msg) {
                dispatch({
                    type: ACTION_TYPES.AUTH_SIGNUP,
                    payload: res.data.token,
                });
                if (res.data.token !== undefined) {
                    localStorage.setItem("JWT_TOKEN", res.data.token)
                }

            }
            if (res.data.msg !== undefined) {
                alert(res.data.msg)
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const signIn = (data) => {
    return async dispatch => {
        try {
            let res = await axios.post("http://localhost:5000/users/signin", data)
            console.log(res);

            dispatch({
                type: ACTION_TYPES.AUTH_SIGNIN,
                payload: res.data.token,
            });
            if (res.data.token !== undefined) {
                localStorage.setItem("JWT_TOKEN", res.data.token)
            }
            if (res.data.msg !== undefined) {
                alert(res.data.msg)
            }
        } catch (err) {
            console.log(err);

        }
    }
}

export const oauthGoogle = data => {
    return async dispatch => {
        console.log(data);
        const res = await axios.post("http://localhost:5000/users/oauth/google", {
            access_token: data
        })
        console.log(res);
    }
}

export const oauthFacebook = data => {
    return async dispatch => {
        console.log(data);
        const res = await axios.post("http://localhost:5000/users/oauth/facebook", {
            access_token: data
        })
        dispatch({
            type: ACTION_TYPES.AUTH_SIGNUP,
            payload: res.data.token,
        });

        if (res.data.token !== undefined) {
            localStorage.setItem("JWT_TOKEN", res.data.token)
        }
    }
}

export const signOut = () => dispatch => {
    localStorage.removeItem("JWT_TOKEN")
    dispatch({
        type: ACTION_TYPES.AUTH_SIGNOUT,
        payload: ""
    })
}