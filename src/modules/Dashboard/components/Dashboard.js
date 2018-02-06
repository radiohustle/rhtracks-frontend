import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { Grid } from 'react-bootstrap'
import Navigation from './Navigation'
import Home from './Home'
import Player from './player/Player'
import CustomData from './customData/CustomData'

const Dashboard = () => {
    return (
        <Grid>
            <Navigation />
            <Switch>
                <Route
                    exact={true}
                    path="/dashboard"
                    component={Home} />
                <Route
                    path="/dashboard/player"
                    component={Player} />
                <Route
                    path="/dashboard/custom"
                    component={CustomData} />
            </Switch>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
    }
}

export default connect(mapStateToProps)(Dashboard)
