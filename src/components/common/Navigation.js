import React from 'react'
import { Grid, ButtonGroup, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <Grid>
            <ButtonGroup>
                <Button>
                    <NavLink exact to="/">Home</NavLink>
                </Button>
                <Button>
                    <NavLink to="/fuel-savings">Demo App</NavLink>
                </Button>
                <Button>
                    <NavLink to="/about">About</NavLink>
                </Button>
            </ButtonGroup>
        </Grid>
    )
}

export default Navigation
