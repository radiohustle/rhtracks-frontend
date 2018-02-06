import React from 'react'
import { connect } from 'react-redux'

import { Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap'

import FontAwesome from 'react-fontawesome'

import {
    createTrackRequest,
} from '../../action'

class RowAppender extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            row: {
                id: null,
                name: '',
                src: '',
                bpm: '',
                type: {
                    classic: false,
                    jnj: false,
                    beg: false,
                },
            },
        }
    }

    handleShow = () => {
        this.setState({
            row: {
                id: null,
                name: '',
                src: '',
                bpm: '',
                type: {
                    classic: false,
                    jnj: false,
                    beg: false,
                },
            },
        })
    }

    handleChange = e => {
        const { id, type } = e.target
        let { value } = e.target
        const { row } = this.state

        if (type === 'checkbox') {
            const { checked } = e.target

            row.type[id] = checked ? 1 : 0
        } else {
            if (id === 'bpm') {
                value = value.replace(/\D/g, '')
            }
            row[id] = value
        }

        this.setState({
            row,
        })
    }

    handleAdd() {
        const { row } = this.state
        const { dispatch, onClose } = this.props

        dispatch(createTrackRequest({
            id: row.id,
            name: row.name,
            src: row.src,
            bpm: +row.bpm,
            classic: row.type.classic ? 1 : 0,
            jnj: row.type.jnj ? 1 : 0,
            beg: row.type.beg ? 1 : 0,
        }, res => {
            onClose({
                id: res.id,
                name: res.name,
                src: res.src,
                bpm: res.bpm,
                type: {
                    classic: res.classic,
                    jnj: res.jnj,
                    beg: res.beg,
                },
            }, 'create')
        }))
    }

    render() {
        const { row } = this.state
        const { fetching, open, onClose } = this.props

        return (
            <Modal
                show={open}
                onShow={this.handleShow}
                onHide={onClose}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>
                        {fetching ? (
                            <FontAwesome
                                name="cog"
                                spin={true} />
                        ) : null} Add new track</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {Object.keys(row).map((key, i) => {
                            if (key === 'id') {
                                return null
                            }

                            if (key === 'type') {
                                return (
                                    <FormGroup
                                        key={i}
                                        controlId={key}>
                                        <Checkbox
                                            id="classic"
                                            inline={true}
                                            checked={row.type.classic}
                                            onChange={this.handleChange}>classic</Checkbox>
                                        {' '}
                                        <Checkbox
                                            id="jnj"
                                            inline={true}
                                            checked={row.type.jnj}
                                            onChange={this.handleChange}>jnj</Checkbox>
                                        {' '}
                                        <Checkbox
                                            id="beg"
                                            inline={true}
                                            checked={row.type.beg}
                                            onChange={this.handleChange}>beg</Checkbox>
                                    </FormGroup>
                                )
                            }

                            return (
                                <FormGroup
                                    key={i}
                                    controlId={key}>
                                    <ControlLabel>{key}</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={row[key]}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            )
                        })}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsStyle="success"
                        disabled={fetching}
                        onClick={this.handleAdd.bind(this, row)}>
                        Add
                    </Button>
                    <Button
                        disabled={fetching}
                        onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetching: state.player.fetchingCreate,
    }
}

export default connect(mapStateToProps)(RowAppender)
