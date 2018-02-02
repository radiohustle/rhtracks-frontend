import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Alert, Col, Form, FormGroup, FormControl, Button, Well } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { fetchLoginRequest } from '../action'

class LoginPage extends React.Component {
    state = {
        username: '',
        password: '',
    }

    componentWillReceiveProps(nextProps) {
        const { token } = nextProps
        const { history } = this.props

        if (token) {
            history.push('/')
        }
    }

    handleChangeField = (type, event) => {
        const { value } = event.target

        this.setState({
            [type]: value,
        })
    }

    handleLogIn = () => {
        const { username, password } = this.state
        const { dispatch } = this.props

        dispatch(fetchLoginRequest({ username, password }))
    }

    render() {
        const { fetching, error } = this.props

        const btn = fetching ? (
            <Button
                type="button"
                disabled={true}>
                <FontAwesome
                    name="spinner"
                    spin={true} />
            </Button>
        ) : (
            <Button
                type="button"
                onClick={this.handleLogIn}>Log In</Button>
        )

        const errorBlock = error ? (
            <FormGroup>
                <Col
                    smOffset={3}
                    sm={6}>
                    <Alert bsStyle="danger">
                        <strong>{error.code}</strong> {error.message}
                    </Alert>
                </Col>
            </FormGroup>
        ) : null

        return (
            <Well>
                <Form horizontal={true}>
                    <FormGroup controlId="username">
                        <Col
                            sm={2}
                            smOffset={3}>
                            Login
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                type="text"
                                placeholder="Login"
                                onChange={this.handleChangeField.bind(this, 'username')} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="password">
                        <Col
                            sm={2}
                            smOffset={3}>
                            Password
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                type="password"
                                placeholder="Password"
                                onChange={this.handleChangeField.bind(this, 'password')} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col
                            smOffset={5}
                            sm={4}>
                            {btn}
                        </Col>
                    </FormGroup>

                    {errorBlock}
                </Form>
            </Well>
        )
    }
}

LoginPage.propTypes = {
    history: PropTypes.object,
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    token: PropTypes.string,
    error: PropTypes.object,
}

const mapStateToProps = (state) => {
    const { auth } = state
    const { fetching, error, token } = auth

    if (error) {
        return {
            error,
        }
    }

    return {
        fetching,
        token,
    }
}

export default connect(mapStateToProps)(LoginPage)
