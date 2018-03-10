import React from 'react'

import {
    Tabs,
    Tab,
} from 'react-bootstrap'

import ConfigJson from './ConfigJson'
import DancerPics from './DancerPics'

const Config = () => {
    return (
        <Tabs
            id="config-tabs"
            defaultActiveKey={1}>
            <Tab
                eventKey={1}
                title="Config JSON">
                <br />
                <ConfigJson />
            </Tab>
        </Tabs>
    )
}

export default Config
