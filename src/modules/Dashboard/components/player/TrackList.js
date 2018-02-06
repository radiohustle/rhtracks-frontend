/* eslint-disable react/no-multi-comp */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'

import { Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import FontAwesome from 'react-fontawesome'

import BpmEditor from './BpmEditor'
import TypeEditor from './TypeEditor'
import RowEditor from './RowEditor'

import {
    fetchTracksRequest,
    deleteTrackRequest,
} from '../../action'

const afterDeleteRow = ({ dispatch }) => rowKyes => {

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

const createBpmEditor = (onUpdate, props) => (
    <BpmEditor
        onUpdate={onUpdate}
        {...props} />
)

const createTypeEditor = (onUpdate, props) => (
    <TypeEditor
        onUpdate={onUpdate}
        {...props} />
)

class TrackList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            showModalEditor: false,
            currentRow: {},
        }
    }

    componentWillReceiveProps(nextProps) {
        const { tracks } = nextProps

        this.setState({
            data: tracks.map(track => {
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
            }),
        })
    }

    componentWillMount() {
        this.refreshTable()
    }

    handleCloseModalEditor(row, method) {
        if (row) {
            const { data } = this.state

            for (let i = 0; i < data.length; i++) {
                const track = data[i]

                if (track.id === row.id) {
                    if (method === 'update') {
                        data[i] = row
                    } else if (method === 'delete') {
                        data.splice(i, 1)
                    }
                    break
                }
            }

            this.setState({
                data,
                showModalEditor: false,
            })
        }
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
            data,
            showModalEditor,
            currentRow,
        } = this.state

        const {
            fetching,
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
                        key="handleClickRefreshButton"
                        type="button"
                        onClick={this.handleClickRefreshButton}>
                        <FontAwesome name="refresh" /> Refresh
                    </Button>
                )

                return buttons
            },
            onRowDoubleClick: (row, e) => {
                this.setState({
                    showModalEditor: true,
                    currentRow: row,
                })
            },
        }

        return (
            <div>
                <RowEditor
                    open={showModalEditor}
                    row={currentRow}
                    onClose={this.handleCloseModalEditor.bind(this)} />
                <BootstrapTable
                    data={data}
                    options={tableOptions}
                    pagination={true}
                    exportCSV={true}
                    csvFileName="rh-player-tracks.csv"
                    striped={true}
                    search={true}
                    insertRow={true}>
                    <TableHeaderColumn
                        isKey={true}
                        dataField="id"
                        dataSort={true}
                        width="100px"
                        hiddenOnInsert={true}>
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
                        width="150px"
                        hiddenOnInsert={true}>
                        type
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
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
