import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Row, Col, Button, Well, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import {
    fetchLastCompetitionsRequest,
    fetchSaveAdditionalDancersInfo,
} from '../../actions/additionalDancersInfoActions'

class ConfigJson extends React.Component {
    constructor(props) {
        super(props)

        const { data } = props

        this.state = {
            date: null,
            contests: [],
            json: {},
            valid: true,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props

        dispatch(fetchLastCompetitionsRequest())
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps

        this.setState({
            json: data,
        })
    }

    handleChangeDate = e => {
        const { target: { value } } = e
        const { json } = this.state

        json.lastCompetition.date = value

        this.setState({
            json,
        })
    }

    handleAddContest = () => {
        const { json } = this.state

        json.lastCompetition.contests.push({
            name: `name_${json.lastCompetition.contests.length}`,
            link: `link_${json.lastCompetition.contests.length}`,
        })

        this.setState({
            json,
        })
    }

    handleDeleteContest = index => {
        const { json } = this.state

        let { lastCompetition: { contests } } = json

        console.log(contests.filter((_, i) => {
            console.log(i, index)

            return i !== index
        }))

        contests = contests.filter((_, i) => i !== index)

        json.lastCompetition.contests = contests

        this.setState({
            json,
        })
    }

    handleSave = () => {
        const { json } = this.state
        const { dispatch } = this.props

        dispatch(fetchSaveAdditionalDancersInfo(json))

        console.log(json)
    }

    handleRefresh = () => {
        const { dispatch } = this.props

        dispatch(fetchLastCompetitionsRequest())
    }

    render() {
        const { json, valid } = this.state
        const { fetching } = this.props

        const { lastCompetition: { date, contests }, pics, links } = json

        if (fetching) {
            return (
                <div>
                    <FontAwesome
                        name="cog"
                        size="5x"
                        spin={true} />
                </div>
            )
        }

        return (
            <div>
                <Row>
                    <Col
                        lg={2}
                        md={4}
                        sm={6}
                        xs={6}>
                        <FormGroup controlId="date">
                            <ControlLabel>date</ControlLabel>
                            <FormControl
                                defaultValue={date}
                                onChange={this.handleChangeDate} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col
                        lg={2}
                        md={4}
                        sm={6}
                        xs={6}>
                        <Button
                            bsStyle="success"
                            onClick={this.handleAddContest}>
                            <FontAwesome name="plus" /> contest
                        </Button>
                        <br />
                        <br />
                    </Col>
                </Row>
                <Row>
                    {contests.map((e, i) => {
                        const key = `${e.name}_${e.link}`

                        return (
                            <Col
                                key={`col_${key}`}
                                lg={3}
                                md={3}
                                sm={4}
                                xs={4}>
                                <Well key={`well_${key}`}>
                                    <FormGroup controlId={`contest_${e.name}`}>
                                        <ControlLabel>name</ControlLabel>
                                        <FormControl
                                            defaultValue={e.name} />
                                    </FormGroup>
                                    <FormGroup controlId={`contest_${e.link}`}>
                                        <ControlLabel>link</ControlLabel>
                                        <FormControl
                                            defaultValue={e.link} />
                                    </FormGroup>
                                    <Button
                                        bsStyle="danger"
                                        onClick={this.handleDeleteContest.bind(this, i)}>
                                        <FontAwesome name="trash" />
                                    </Button>
                                </Well>
                            </Col>
                        )
                    })}
                </Row>
                <Row>
                    <Col
                        lg={1}
                        md={1}
                        sm={1}
                        xs={6}>
                        <Button
                            bsStyle="success"
                            disabled={!valid}
                            onClick={this.handleSave}>
                            <FontAwesome name="save" /> save
                        </Button>
                    </Col>
                    <Col
                        lg={1}
                        md={1}
                        sm={1}
                        xs={6}>
                        <Button
                            onClick={this.handleRefresh}>
                            <FontAwesome name="refresh" /> refresh
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

ConfigJson.propTypes = {}

const mapStateToProps = state => {
    return {
        fetching: state.additionalDancersInfo.fetchingData,
        data: state.additionalDancersInfo.data,
    }
}

export default connect(mapStateToProps)(ConfigJson)
