import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class Header extends Component {
    render() {
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
                            <li className="nav-item ">
                                <Link className="nav-link" to="/signup">Sign up </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to="/signin">Sign in</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signout">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
