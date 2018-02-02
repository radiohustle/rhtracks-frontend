import React from 'react'
import PropTypes from 'prop-types'
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

Layout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default Layout
