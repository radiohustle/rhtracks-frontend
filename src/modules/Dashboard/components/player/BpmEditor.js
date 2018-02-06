import React from 'react'
import PropTypes from 'prop-types'

class BpmEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bpm: props.defaultValue.bpm,
        }
    }

    handleUpdateData = () => {
        const { bpm } = this.state

        this.props.onUpdate({
            bpm,
        })
    }

    render() {
        return (
            <span>
                <input
                    className={`form-control editor edit-text`}
                    style={{ display: 'inline', width: '50%' }}
                    type="text"
                    value={this.state.bpm}
                    onKeyDown={this.props.onKeyDown}
                    onChange={(ev) => {
                        this.setState({ amount: parseInt(ev.currentTarget.value, 10) })
                    }} />
                <button
                    className="btn btn-info btn-xs textarea-save-btn"
                    onClick={this.handleUpdateData}>
          save
                </button>
            </span>
        )
    }
}

BpmEditor.propTypes = {

}

export default BpmEditor
