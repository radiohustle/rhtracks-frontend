import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Row } from 'react-bootstrap'

import BoardWell from './BoardWell'

const Home = (props) => {
    const { roles } = props
    const wells = []

    if (roles.indexOf('ROLE_ADMIN') > -1) {
        wells.push(
            <BoardWell
                key={0}
                to="/"
                title="Only admin can see this block" />
        )
    }

    wells.push(
        <BoardWell
            key={1}
            to="/dashboard/player"
            title="Player" />
    )

    return (
        <Row>
            {wells}
        </Row>
    )
}

Home.defaultProps = {
    roles: [],
}

Home.propTypes = {
    roles: PropTypes.array,
}

const mapStateToProps = state => {
    return {
        roles: state.auth.roles,
    }
}

export default connect(mapStateToProps)(Home)
