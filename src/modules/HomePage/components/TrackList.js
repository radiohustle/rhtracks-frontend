import React from 'react'
import { connect } from 'react-redux'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { fetchTracksRequest } from '../action'

import styles from '../styles/TrackList.sass'

class TrackList extends React.Component {
    componentWillMount() {
        const { dispatch } = this.props

        dispatch(fetchTracksRequest())
    }

    render() {
        const products = [
            {
                id: 1,
                name: 'name',
                bpm: 100,
            }
        ]

        return (
            <BootstrapTable data={products}>
                <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>src</TableHeaderColumn>
                <TableHeaderColumn dataField='bpm'>bpm</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state', state)

    return {
        list: [],
    }
}

export default connect(mapStateToProps)(TrackList)
