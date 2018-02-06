import React from 'react'

import {
    Tabs,
    Tab,
} from 'react-bootstrap'

import LatestUpdate from './LatestUpdate'
import DancerPics from './DancerPics'

const Config = () => {
    return (
        <Tabs
            id="config-tabs"
            defaultActiveKey={1}>
            <Tab
                eventKey={1}
                title="Latest Update">
                <br />
                <LatestUpdate />
            </Tab>
            <Tab
                eventKey={2}
                title="Pics">
                <br />
                <DancerPics />
            </Tab>
        </Tabs>
    )
}

export default Config
