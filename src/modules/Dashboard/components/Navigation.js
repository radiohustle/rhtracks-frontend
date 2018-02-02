import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import packageJson from '../../../../package.json'

import {
    Badge,
    Nav,
    NavItem,
    Navbar,
    NavDropdown,
    MenuItem,
} from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'

class Navigation extends React.Component {
    handleLogout = () => {
        const { history } = this.props

        sessionStorage.removeItem('auth_token')

        history.push('/login')
    }

    render() {
        const { username } = this.props

        return (
            <Navbar collapseOnSelect={true}>
                <Navbar.Header>
                    <Navbar.Brand>Data RH <Badge>{packageJson.version}</Badge></Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/dashboard">
                            <NavItem>
                                Dashboard
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to="/dashboard/player">
                            <NavItem>
                                Player
                            </NavItem>
                        </LinkContainer>
                        <NavDropdown
                            eventKey={1}
                            id="nav-profile-dropdown"
                            title={username}>
                            <MenuItem onClick={this.handleLogout}>Log out</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

Navigation.propTypes = {
    history: PropTypes.object,
    username: PropTypes.string,
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
    }
}

export default withRouter(connect(mapStateToProps)(Navigation))
