import React from 'react'
import { connect } from 'react-redux'

import { FETCH_TRACKS } from '../const'
import styles from '../styles/TrackList.sass'

class TrackList extends React.Component {
    componentWillMount() {
        const { dispatch } = this.props

        dispatch()
    }

    render() {
        return (
            <div className={styles.list}>
                <table>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: [],
    }
}

export default connect(mapStateToProps)(TrackList)
