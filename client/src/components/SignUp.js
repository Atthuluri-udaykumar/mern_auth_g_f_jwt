import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { connect } from "react-redux"
import { signUp } from "../action/index"

const initialvalues = {
    email: "",
    password: ""
}
const SignUp = (props) => {
    const [values, setvalues] = useState(initialvalues)

    const handlechange = (e) => {
        let { name, value } = e.target
        setvalues({
            ...values,
            [name]: value
        })
    }

    const responseGoogle = (res) => {
        console.log(res);
    }
    const responseFacebook = (res) => {
        console.log(res);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        props.signUp(values)
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
                        <button className="btn btn-primary my-3" type="submit">SignUP</button>
                    </form>

                </div>
                <div className="col text-center card mt-5">
                    <div className="alert alert-info my-5">SignUP whith google or facebook</div>
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

        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.errorMsg
})

export default connect(mapStateToProps, { signUp })(SignUp);