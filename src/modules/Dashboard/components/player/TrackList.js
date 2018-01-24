import React from 'react'
import { connect } from 'react-redux'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import FontAwesome from 'react-fontawesome'

import TypeEditor from './TypeEditor'

import { fetchTracksRequest } from '../../action'

const beforeSaveCell = (row, cellName, cellValue) => {
    if (cellName === 'bpm') {
        cellValue = +cellValue

        if (isNaN(cellValue)) {
            alert('Value must be integer!')

            return false
        }
    }

    return true
}

const typeFormatter = (cell) => {
    cell = cell || {}

    const result = []

    Object.keys(cell).forEach(key => {
        if (cell[key]) {
            let labelClassName = 'default'

            if (key === 'classic') {
                labelClassName = 'success'
            } else if (key === 'jnj') {
                labelClassName = 'info'
            } else if (key === 'beg') {
                labelClassName = 'warning'
            }

            result.push(`<label class="label label-${labelClassName}" style="margin-right: 5px">${key}</label>`)
        }
    })

    return result.join('')
}

const createTypeEditor = (onUpdate, props) => (
    <TypeEditor
        onUpdate={onUpdate}
        {...props} />
)

// eslint-disable-next-line react/no-multi-comp
class TrackList extends React.Component {
    componentWillMount() {
        const { dispatch } = this.props

        dispatch(fetchTracksRequest())
    }

    render() {
        const {
            fetching,
            tracks,
        } = this.props

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

        const cellEdit = {
            mode: 'dbclick',
            blurToSave: true,
            beforeSaveCell,
        }

        return (
            <BootstrapTable
                data={tracks}
                pagination={true}
                exportCSV={true}
                csvFileName="rh-player-tracks.csv"
                striped={true}
                search={true}
                cellEdit={cellEdit}>
                <TableHeaderColumn
                    isKey={true}
                    dataField="id"
                    dataSort={true}>
                    ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="name">
                    src
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="bpm"
                    dataSort={true}>
                    bpm
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="type"
                    dataFormat={typeFormatter}
                    customEditor={{ getElement: createTypeEditor }}>
                    type
                </TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fetching: state.player.fetching,
        tracks: state.player.tracks,
    }
}

export default connect(mapStateToProps)(TrackList)
