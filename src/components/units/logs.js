import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Logs extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        logs: proptypes.array.isRequired
    };

    render() {
        const styles = this.getStyles();

        return (
            <div>
                <h1 style={styles.title}>LOGS!</h1>

                {this.props.logs.map((log) => {
                    return (
                        <div style={styles.divStyles}>
                            <span style={styles.spanStyles}>{log}</span>
                        </div>
                    )
                })}
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

export default Radium(Logs);