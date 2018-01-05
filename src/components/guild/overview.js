import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Overview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = this.getStyles();

        return (
            <div>
                <h1 style={styles.title}>OVERVIEW!</h1>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>Members:</span>
                    <span> {this.props.guild.members.length} </span>
                </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>Total Quests:</span>
                    <span> {this.props.guild.totalQuests} </span>
                </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>Renown:</span>
                    <span> {this.props.guild.renown} </span>
                </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>Gold:</span>
                    <span> {this.props.guild.gold} </span>
                </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>IdleMembers:</span>
                    <span> {0} </span>
                </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>Cleanness:</span>
                    <span> {this.props.guild.cleanness} </span>
                </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>Repairs:</span>
                    <span> {this.props.guild.repairs} </span>
                </div>
            </div>
        )
    }

    getStyles() {
        return {
            title: {
                textAlign: 'center',
                marginTop: 100
            },
            divStyles: {
                padding: 5
            },
            spanStyles: {
                marginRight: 5
            },
        }
    }
}

export default Radium(Overview);