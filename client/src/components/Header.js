import React from 'react';
import { Link } from "react-router-dom";

import { connect } from "react-redux"
import { signOut } from "../action/index"

const Header = (props) => {
    const signOutSet = () => {
        props.signOut()
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashbord">Dashbord </Link>
                        </li>
                    </ul>

                    <ul className="nav ml-auto navbar-nav">
                        {!props.isAuth ?
                            <React.Fragment>
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/signup">Sign up </Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/signin">Sign in</Link>
                                </li></React.Fragment> : null}
                        {props.isAuth ? <li className="nav-item">
                            <Link className="nav-link" to="/signout" onClick={signOutSet}>Sign out</Link>
                        </li> : null}

                    </ul>
                </div>
            </nav>
        </div>
    )
}
const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signOut })(Header)