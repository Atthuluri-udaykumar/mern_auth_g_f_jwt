import React, { Component } from 'react'
import { connect } from "react-redux"
export default (OriginalComponent) => {
    class MixedComponent extends Component {
        checkAuth() {
            if (!this.props.isAuth && !this.props.Token) {
                this.props.history.push("/signin")
            }
        }
        componentDidMount() {
            this.checkAuth()
        }
        componentDidUpdate() {
            this.checkAuth()
        }

        render() {
            return <OriginalComponent />
        }
    }

    const mapStateToProps = state => ({
        isAuth: state.auth.isAuthenticated,
        Token: state.auth.tokens
    })
    return connect(mapStateToProps)(MixedComponent)
}
