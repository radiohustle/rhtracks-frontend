/* eslint-disable import/no-named-as-default */
import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Redirect, Route } from 'react-router-dom'

import Layout from './common/Layout'
import HomePage from '../modules/HomePage'
import LoginPage from '../modules/Auth/components/LoginPage'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const authCheck = () => {
    return !!sessionStorage.auth_token
}

class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/login"
                    component={LoginPage}
                />
                <Route
                    exact
                    path="/"
                    render={() => authCheck() ? <HomePage /> : <Redirect to="/login" />}
                />
            </Switch>
        )
    }
}

App.propTypes = {
    children: PropTypes.element
}

export default App
