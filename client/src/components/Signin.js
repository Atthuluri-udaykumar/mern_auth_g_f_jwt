import React, { useState } from 'react'

const initialvalues = {
    email: "",
    password: ""
}
const Signin = () => {
    const [values, setvalues] = useState(initialvalues)

    const handlechange = (e) => {
        let { name, value } = e.target
        setvalues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col  card mt-5">
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
                    <div className="alert alert-info my-5">signin whith google or facebook</div>
                    <div>
                        <button className="btn btn-danger m-2">Google+</button>
                        <button className="btn btn-primary m-2">facebook</button>
                    </div>

                </div>
            </div>

        </div>
    )
}


export default Signin;