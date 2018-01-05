import React from 'react';
import proptypes from 'prop-types';
import Radium from 'radium';

import Overview from './overview';
import Members from './members';
import Buildings from './buildings';
import Logs from '../logs';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.openOverview = this.openOverview.bind(this);
        this.openMembers = this.openMembers.bind(this);
        this.openBuildings = this.openBuildings.bind(this);
        this.openLogs = this.openLogs.bind(this);
    }

    static proptypes = {
        changeActiveComponent: proptypes.func.isRequired,
        guild: proptypes.object.isRequired
    };

    openOverview(e) {
        this.props.changeActiveComponent(<Overview guild={this.props.guild} />);
    }

    openMembers(e) {
        this.props.changeActiveComponent(<Members guild={this.props.guild} />);
    }

    openBuildings(e) {
        this.props.changeActiveComponent(<Buildings guild={this.props.guild} />);
    }

    openLogs(e) {
        this.props.changeActiveComponent(<Logs logs={this.props.guild.logs} />);
    }

    render() {
        const styles = this.getStyles();

        return (
            <nav>
                <ul style={styles.ulSyles}>
                    <li style={styles.liStyles} key="overview" onClick={this.openOverview} >Overview</li>
                    <li style={styles.liStyles} key="members" onClick={this.openMembers} >Members</li>
                    <li style={styles.liStyles} key="quests" onClick={this.openOverview} >Quests</li>
                    <li style={styles.liStyles} key="buildings" onClick={this.openBuildings} >Buildings</li>
                    <li style={styles.liStyles} key="logs" onClick={this.openLogs} >Logs</li>
                    <li style={styles.gold} key="gold"> Gold: {this.props.guild.gold} </li>
                </ul>
            </nav>
        );
    }
    getStyles() {
        return {
            ulSyles: {
                listStyleType: 'none',
                margin: 5,
                padding: 0
            },
            liStyles: {
                display: 'block',
                float: 'left',
                padding: '1em',
                backgroundColor: 'LightGray',
                textAlign: 'center',
                marginBottom: '0.2em',
                marginLeft: '0.5em',
                textDecoration: 'none',
                color: 'black',
                width: '6em',
                ':hover': {
                    backgroundColor: 'LightCoral',
                    cursor: 'pointer'
                }
            },
            gold: {
                color: 'white'
            }
        }
    }
}

export default Radium(Menu);