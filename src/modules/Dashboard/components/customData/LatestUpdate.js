import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Row, Col, Well, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

import { fetchLastCompetitionsRequest } from '../../actions/customDataActions'

class LastCompetitions extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            date: null,
            contests: [],
        }
    }

    componentWillMount () {
        const { dispatch } = this.props

        dispatch(fetchLastCompetitionsRequest())
    }

    componentWillReceiveProps (nextProps) {
        const { date, contests } = nextProps

        this.setState({
            date,
            contests,
        })
    }

    render () {
        const { date, contests } = this.state
        const { fetching } = this.props

        if (fetching) {
            return 'Fetching...'
        }

        return (
            <Form>
                <Row>
                    <Col
                        lg={4}
                        md={4}
                        sm={6}
                        xs={6}>
                        <FormGroup controlId="date">
                            <ControlLabel>Date</ControlLabel>
                            <FormControl
                                type="text"
                                value={date} />
                        </FormGroup>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col
                        lg={4}
                        md={4}
                        sm={6}
                        xs={6}>
                        {contests.map((contest, i) => {
                            return (
                                <Well key={`${contest.name}-well`}>
                                    <FormGroup
                                        key={`${contest.name}-name`}
                                        controlId={`contest-name-${i}`}>
                                        <ControlLabel>Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={contest.name} />
                                    </FormGroup>
                                    <FormGroup
                                        key={`${contest.name}-link`}
                                        controlId={`contest-link-${i}`}>
                                        <ControlLabel>Url</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={contest.link} />
                                    </FormGroup>
                                </Well>
                            )
                        })}
                    </Col>
                </Row>
            </Form>
        )
    }
}

LastCompetitions.propTypes = {}

const mapStateToProps = state => {
    return {
        fetching: state.custom.fetchingLatestUpdate,
        date: state.custom.latestDate,
        contests: state.custom.latestContests,
    }
}

export default connect(mapStateToProps)(LastCompetitions)
