import React from 'react'
import PropTypes from 'prop-types'

class TypeEditor extends React.Component {
    constructor (props) {
        super(props)
        this.handleUpdateData = this.handleUpdateData.bind(this)
        this.state = {
            open: true,
            classic: props.defaultValue.classic,
            jnj: props.defaultValue.jnj,
            beg: props.defaultValue.beg,
        }
    }

    handleUpdateData () {
        const { classic, jnj, beg } = this.state

        this.props.onUpdate({
            classic,
            jnj,
            beg,
        })
    }

    handleClose = () => {
        this.setState({ open: false })
        this.props.onUpdate(this.props.defaultValue)
    }

    render () {
        const fadeIn = this.state.open ? 'in' : ''
        const display = this.state.open ? 'block' : 'none'

        const { classic, jnj, beg } = this.state

        return (
            <div
                className={`modal fade ${fadeIn}`}
                id="myModal"
                role="dialog"
                style={{ display }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <label>
                                <input
                                    className={`${this.props.editorClass || ''} editor edit-text`}
                                    type="checkbox"
                                    value="classic"
                                    defaultChecked={classic}
                                    style={{
                                        verticalAlign: 'top',
                                    }}
                                    onChange={e => {
                                        this.setState({ [e.currentTarget.value]: e.currentTarget.checked })
                                    }} />
                                {' '}Classic
                            </label>
                            <br />
                            <label>
                                <input
                                    className={`${this.props.editorClass || ''} editor edit-text`}
                                    type="checkbox"
                                    value="jnj"
                                    defaultChecked={jnj}
                                    style={{
                                        verticalAlign: 'top',
                                    }}
                                    onChange={e => {
                                        this.setState({ [e.currentTarget.value]: e.currentTarget.checked })
                                    }} />
                                {' '}JnJ
                            </label>
                            <br />
                            <label>
                                <input
                                    className={`${this.props.editorClass || ''} editor edit-text`}
                                    type="checkbox"
                                    value="beg"
                                    defaultChecked={beg}
                                    style={{
                                        verticalAlign: 'top',
                                    }}
                                    onChange={e => {
                                        this.setState({ [e.currentTarget.value]: e.currentTarget.checked })
                                    }} />
                                {' '}Beg
                            </label>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleUpdateData}>Save</button>
                            <button
                                type="button"
                                className="btn btn-default"
                                onClick={this.handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TypeEditor.propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onUpdate: PropTypes.func,
    editorClass: PropTypes.string,
}

export default TypeEditor
