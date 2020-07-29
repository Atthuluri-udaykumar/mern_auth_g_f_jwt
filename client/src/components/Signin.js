import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { connect } from "react-redux"
import { signIn, oauthGoogle, oauthFacebook } from "../action/index"

const initialvalues = {
    email: "",
    password: ""
}
const SignIn = (props) => {
    const [values, setvalues] = useState(initialvalues)
    const [img, setimg] = useState({ img: "", name: "" })
    const handlechange = (e) => {
        let { name, value } = e.target
        setvalues({
            ...values,
            [name]: value
        })
    }

    const responseGoogle = (res) => {
        console.log(res);
        props.oauthGoogle(res.accessToken)
        setimg({
            name: res.profileObj.givenName,
            img: res.profileObj.imageUrl
        })
    }

    const responseFacebook = (res) => {

        props.oauthFacebook(res.accessToken)
        setimg({
            name: res.name,
            img: res.picture.data.url
        })
        if (props.auth_token) {
            props.history.push("/dashbord")
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.signIn(values);

        if (props.auth_token) {
            props.history.push("/dashbord")
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col  card mt-5">
                    {props.error === undefined ?
                        <div className="alert alert-danger">{props.error}</div>
                        : null}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="enter the email"
                                className="form-control"
                                value={values.email}
                                onChange={handlechange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="enter the password"
                                className="form-control"
                                value={values.password}
                                onChange={handlechange}
                            />
                        </div>
                        <button className="btn btn-primary my-3" type="submit">SignIn</button>
                    </form>

                </div>
                <div className="col text-center card mt-5">
                    <div className="alert alert-info my-5">SignIn whith google or facebook</div>
                    <div>
                        <GoogleLogin
                            clientId="132896703812-gveducl03dhm3th8n72gfp5rujld63e6.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cssClass="btn btn-outline-danger"
                        />,
                        <FacebookLogin
                            appId="608818940055630"
                            textButton="facebook"
                            autoLoad={false}
                            fields="name,email,picture"
                            cssClass="btn btn-outline-priary ml-4"
                            callback={responseFacebook} />
                    </div>

                </div>
            </div>
            {img.img !== "" ? <div className="card w-50 mx-auto my-5">
                <h1 className="card-header text-center">{img.name}</h1>
                <div className="card-img-top d-flex justify-content-center">
                    <img src={img.img} className="img-fluid w-50 " />
                </div>
            </div>
                : null}

        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.errorMsg,
    auth_token: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signIn, oauthGoogle, oauthFacebook })(SignIn);