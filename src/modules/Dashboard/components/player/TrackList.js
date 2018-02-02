import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'

import { Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import FontAwesome from 'react-fontawesome'

import TypeEditor from './TypeEditor'

import {
    fetchTracksRequest,
    updateTrackRequest,
    deleteTrackRequest,
} from '../../action'

const afterDeleteRow = ({ dispatch }) => rowKyes => {
    dispatch(deleteTrackRequest(rowKyes[0]))
}

const beforeSaveCell = () => (row, cellName, cellValue) => {

    if (cellName === 'bpm') {
        cellValue = +cellValue

        if (isNaN(cellValue)) {
            NotificationManager.error('bpm value must be integer!')

            return false
        }
    }

    return true
}

const afterSaveCell = ({ dispatch }) => row => {
    dispatch(
        updateTrackRequest({
            id: row.id,
            name: row.name,
            src: row.src,
            bpm: +row.bpm,
            classic: row.type.classic ? 1 : 0,
            jnj: row.type.jnj ? 1 : 0,
            beg: row.type.beg ? 1 : 0,
        })
    )
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
        this.refreshTable()
    }

    handleClickRefreshButton = () => {
        this.refreshTable()
    }

    refreshTable = () => {
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

        const tableOptions = {
            afterDeleteRow: afterDeleteRow(this.props),
            btnGroup: props => {
                const buttons = []

                Object.keys(props).forEach((key, i) => {
                    if (props[key]) {
                        const e = React.cloneElement(props[key], { key: i })

                        buttons.push(e)
                    }
                })

                buttons.push(
                    <Button
                        type="button"
                        onClick={this.handleClickRefreshButton}>
                        <FontAwesome name="refresh" /> Refresh
                    </Button>
                )

                return buttons
            },
        }

        const selectRow = {
            mode: 'radio',
        }

        const cellEdit = {
            mode: 'dbclick',
            blurToSave: true,
            beforeSaveCell: beforeSaveCell(this.props),
            afterSaveCell: afterSaveCell(this.props),
        }

        const data = tracks.map(track => {
            return {
                id: track.id,
                name: track.name,
                src: track.src,
                bpm: track.bpm,
                type: {
                    classic: track.classic,
                    jnj: track.jnj,
                    beg: track.beg,
                },
            }
        })

        return (
            <BootstrapTable
                data={data}
                options={tableOptions}
                pagination={true}
                exportCSV={true}
                csvFileName="rh-player-tracks.csv"
                striped={true}
                search={true}
                selectRow={selectRow}
                cellEdit={cellEdit}
                insertRow={true}
                deleteRow={true}>
                <TableHeaderColumn
                    isKey={true}
                    dataField="id"
                    dataSort={true}
                    width="100px">
                    ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="name">
                    name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="src">
                    src
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="bpm"
                    dataSort={true}
                    width="75px">
                    bpm
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="type"
                    dataFormat={typeFormatter}
                    customEditor={{ getElement: createTypeEditor }}
                    width="150px">
                    type
                </TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

TrackList.propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    tracks: PropTypes.array,
}

const mapStateToProps = state => {
    return {
        fetching: state.player.fetching,
        tracks: state.player.tracks,
    }
}

export default connect(mapStateToProps)(TrackList)
