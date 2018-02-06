import React from 'react'
import { connect } from 'react-redux'

import { Modal, Form, FormGroup, FormControl, ControlLabel, Checkbox, ButtonGroup, Button } from 'react-bootstrap'

import FontAwesome from 'react-fontawesome'

import {
    updateTrackRequest,
    deleteTrackRequest,
} from '../../action'

class RowEditor extends React.Component {
    constructor (props) {
        super(props)

        const { row } = props

        this.state = {
            row,
            isDeleting: false,
        }
    }

    handleShow = () => {
        const { row } = this.props

        this.setState({
            row,
            isDeleting: false,
        })
    }

    handleChange = (e) => {
        const { id, value, type } = e.target
        const { row } = this.state

        if (type === 'checkbox') {
            const { checked } = e.target

            row.type[id] = checked ? 1 : 0
        } else {
            row[id] = value
        }

        this.setState({
            row,
        })
    }

    handleSave (row) {
        const { dispatch, onClose } = this.props

        dispatch(updateTrackRequest({
            id: row.id,
            name: row.name,
            src: row.src,
            bpm: +row.bpm,
            classic: row.type.classic ? 1 : 0,
            jnj: row.type.jnj ? 1 : 0,
            beg: row.type.beg ? 1 : 0,
        }, () => {
            onClose(row, 'update')
        }))
    }

    handleDelete = () => {
        this.setState({
            isDeleting: true,
        })
    }

    handleSureDelete (row) {
        const { dispatch, onClose } = this.props

        dispatch(deleteTrackRequest(row.id, () => {
            onClose(row, 'delete')
        }))
    }

    render () {
        const { row, isDeleting } = this.state
        const { fetching, open, onClose } = this.props

        const deleteBtn = isDeleting ? (
            <ButtonGroup
                style={{
                    float: 'left',
                }}>
                <Button
                    bsStyle="danger"
                    disabled={fetching}
                    onClick={this.handleSureDelete.bind(this, row)}>
                    I want to delete
                </Button>
                <Button
                    disabled={fetching}
                    onClick={() => {
                        this.setState({
                            isDeleting: false,
                        })
                    }}>
                    Cancel
                </Button>
            </ButtonGroup>
        ) : (
            <Button
                bsStyle="danger"
                disabled={fetching}
                onClick={this.handleDelete.bind(this, row)}
                style={{
                    float: 'left',
                }}>
                Delete
            </Button>
        )

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
                        ) : null} Edit track ID: {row.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {Object.keys(row).map((key, i) => {
                            if (key === 'type') {
                                return (
                                    <FormGroup
                                        key={i}
                                        controlId={key}>
                                        <Checkbox
                                            id="classic"
                                            inline={true}
                                            checked={!!row.type.classic}
                                            onChange={this.handleChange}>classic</Checkbox>
                                        {' '}
                                        <Checkbox
                                            id="jnj"
                                            inline={true}
                                            checked={!!row.type.jnj}
                                            onChange={this.handleChange}>jnj</Checkbox>
                                        {' '}
                                        <Checkbox
                                            id="beg"
                                            inline={true}
                                            checked={!!row.type.beg}
                                            onChange={this.handleChange}>beg</Checkbox>
                                    </FormGroup>
                                )
                            }

                            const readOnly = key === 'id'

                            return (
                                <FormGroup
                                    key={i}
                                    controlId={key}>
                                    <ControlLabel>{key}</ControlLabel>
                                    <FormControl
                                        type="text"
                                        readOnly={readOnly}
                                        value={row[key]}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            )
                        })}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {deleteBtn}
                    <Button
                        bsStyle="success"
                        disabled={fetching}
                        onClick={this.handleSave.bind(this, row)}>
                        Save
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
    console.log('mapStateToProps', state)
    console.log('fetching', state.player.fetchingUpdate || state.player.fetchingDelete)

    return {
        fetching: state.player.fetchingUpdate || state.player.fetchingDelete,
    }
}

export default connect(mapStateToProps)(RowEditor)
