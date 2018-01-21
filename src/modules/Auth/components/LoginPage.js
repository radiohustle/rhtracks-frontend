import React from 'react'
import { connect } from 'react-redux'

import { Col, Form, FormGroup, FormControl, Checkbox, Button, Modal } from 'react-bootstrap'

import { fetchLoginRequest } from '../action'

class LoginPage extends React.Component {
    state = {
        username: '',
        password: '',
    }

    componentWillUpdate() {
        console.log('componentWillUpdate')
    }

    componentWillReceiveProps() {
        const { token, history } = this.props

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

        console.log(this.props)

        dispatch(fetchLoginRequest({ username, password }))
    }

    render() {
        return (
            <Modal show={true}>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="username">
                            <Col sm={2}>
                                Login
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Login"
                                    onChange={this.handleChangeField.bind(this, 'username')} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="password">
                            <Col sm={2}>
                                Password
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handleChangeField.bind(this, 'password')} />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button
                                    type="button"
                                    onClick={this.handleLogIn}>Log In</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    }
}

export default connect(mapStateToProps)(LoginPage)
