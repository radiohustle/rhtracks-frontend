import React from 'react'
import { Grid } from 'react-bootstrap'

const Layout = ({ children }) => {
    return (
        <div id="layout">
            <Grid>
                {children}
            </Grid>
        </div>
    )
}

export default Layout
