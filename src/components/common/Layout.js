import React from 'react'
import { Grid } from 'react-bootstrap'
import Navigation from './Navigation'

const Layout = ({ children }) => {
    return (
        <div id="layout">
            <Navigation />
            <Grid>
                {children}
            </Grid>
        </div>
    )
}

export default Layout
