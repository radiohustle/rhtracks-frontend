/* eslint-disable import/no-named-as-default */
import React from 'react'
import PropTypes from 'prop-types'
import {Switch, NavLink, Route} from 'react-router-dom'

import HomePage from '../modules/HomePage'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <NavLink exact to="/">Home</NavLink>
                    {' | '}
                    <NavLink to="/fuel-savings">Demo App</NavLink>
                    {' | '}
                    <NavLink to="/about">About</NavLink>
                </div>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                </Switch>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.element
}

export default App
