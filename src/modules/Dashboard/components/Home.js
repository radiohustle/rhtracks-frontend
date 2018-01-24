import React from 'react'

import {
    Row,
    Col,
    Well,
} from 'react-bootstrap'

const Home = () => {
    return (
        <Row>
            <Col
                lg={4}
                md={4}
                sm={6}
                xs={12}>
                <Well>
                    Player
                </Well>
            </Col>
        </Row>
    )
}

export default Home
