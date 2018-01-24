import React from 'react'

import {
    Tabs,
    Tab,
} from 'react-bootstrap'

import TrackList from './TrackList'

const Player = () => {
    return (
        <Tabs
            id="dashboard-player-tabs"
            defaultActiveKey={1}>
            <Tab
                eventKey={1}
                title="List">
                <br />
                <TrackList />
            </Tab>
        </Tabs>
    )
}

export default Player
