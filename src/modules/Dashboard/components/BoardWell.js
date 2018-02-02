import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Col, Well } from 'react-bootstrap'

const BoardWell = (props) => {
    const { title, to } = props

    return (
        <Col
            lg={4}
            md={4}
            sm={6}
            xs={12}>
            <Link to={to}>
                <Well>
                    {title}
                </Well>
            </Link>
        </Col>
    )
}

BoardWell.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}

export default BoardWell
