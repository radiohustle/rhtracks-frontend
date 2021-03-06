/* eslint-disable import/no-named-as-default,react/no-multi-comp,react/prefer-stateless-function */
import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Redirect, Route } from 'react-router-dom'
import { NotificationContainer } from 'react-notifications'

import { Grid } from 'react-bootstrap'

import Dashboard from '../modules/Dashboard'
import LoginPage from '../modules/Auth/components/LoginPage'

import 'react-notifications/lib/notifications.css'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const authCheck = () => {
    return !!sessionStorage.auth_token
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            authCheck() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }} />
            )
        )} />
)

PrivateRoute.propTypes = {
    component: PropTypes.element,
    location: PropTypes.object,
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Grid>
                    <Switch>
                        <Route
                            exact={true}
                            path="/"
                            render={() => authCheck() ? <Redirect to="/dashboard" /> : <Redirect to="/login" />} />
                        <Route
                            path="/login"
                            component={LoginPage} />
                        <PrivateRoute
                            path="/dashboard"
                            component={Dashboard} />
                    </Switch>
                </Grid>
                <NotificationContainer />
            </div>
        )
    }
}

App.propTypes = {

}

export default App
