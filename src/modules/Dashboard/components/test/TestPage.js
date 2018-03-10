import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'

import { fetchTestUpload } from './action'

class TestPage extends React.Component {
    state = {
        file: null,
    }

    handleChangeFile = e => {
        this.setState({
            file: e.target.files[0],
        })
    }

    handleUpload = () => {
        const { file } = this.state
        const { dispatch } = this.props

        if (file) {
            dispatch(fetchTestUpload('/player/upload', file))
        }
    }

    render () {
        return (
            <div>
                <Row>
                    <input
                        type="file"
                        onChange={this.handleChangeFile} />
                </Row>
                <Row>
                    <Button onClick={this.handleUpload}>
                        upload
                    </Button>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {

    }
}

export default connect(mapStateToProps)(TestPage)
