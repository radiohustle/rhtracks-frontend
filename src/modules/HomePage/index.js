import React from 'react'

import {
    Navbar,
    NavbarBrand,
    Grid,
    Row
} from 'react-bootstrap'
import TrackList from './components/TrackList'

import styles from './styles/HomePage.sass'

const HomePage = () => {
    return (
        <Grid>
            <Navbar>
                <NavbarBrand>Dashboard</NavbarBrand>
            </Navbar>
            <Row>
                <TrackList />
            </Row>
        </Grid>
    )
}

export default HomePage
