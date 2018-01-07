import React from 'react';
import proptypes from 'prop-types';
import Radium from 'radium';

import Overview from './overview';
import Items from './items';
import Logs from '../units/logs';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.openOverview = this.openOverview.bind(this);
        this.openItems = this.openItems.bind(this);
        this.openLogs = this.openLogs.bind(this);
    }

    static proptypes = {
        changeActiveComponent: proptypes.func.isRequired,
        character: proptypes.object.isRequired,
        guild: proptypes.object.isRequired
    };

    openOverview() {
        this.props.changeActiveComponent(<Overview character={this.props.character} guild={this.props.guild} />);
    }

    openItems() {
        this.props.changeActiveComponent(<Items character={this.props.character} guild={this.props.guild} />);
    }

    openLogs() {
        this.props.changeActiveComponent(<Logs logs={this.props.character.logs} />);
    }

    render() {
        const styles = this.getStyles();

        return (
            <nav>
                <ul style={styles.ulSyles}>
                    <li style={styles.liStyles} key="overview" onClick={this.openOverview} >Overview</li>
                    <li style={styles.liStyles} key="items" onClick={this.openItems} >Items</li>
                    <li style={styles.liStyles} key="logs" onClick={this.openLogs} >Logs</li>
                    <li style={styles.gold} key="gold"> Gold: {this.props.character.gold} </li>
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