import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        if (props.id === '-1') {
            this.state[props.editable] = window.store.data[props.editable];
        } else {
            this.state[props.editable] = window.store.data.world[props.editable][props.id];
        }
    }

    static propTypes = {
        editable: proptypes.string.isRequired,
        id: proptypes.any.isRequired
    };

    componentWillReceiveProps(nextProps) {
        const newState = {};

        if (nextProps.id === '-1') {
            newState[nextProps.editable] = window.store.data[nextProps.editable];
        } else {
            newState[nextProps.editable] = window.store.data.world[nextProps.editable][nextProps.id];
        }

        this.setState(newState);
    }

    update(paramName, parent, gp, ggp, e) {
        const newItem = this.state[this.props.editable].update(paramName, parent, gp, ggp, e.target.value);

        window.store.data[this.props.editable] = newItem;

        const newState = [];
        newState[this.props.editable] = newItem;
        this.setState(newState);

    }

    render () {
        const formStyles = {
            width: 300
        };

        return (
            <div>
                <h3>{this.props.editable} edition</h3>

                <div style={formStyles}>
                    {this.state[this.props.editable].openValues.map((name) => { return this.getInputField(name)})}
                    {this.state[this.props.editable].closedValues.map((name) => { return this.getInputField(name, true)})}
                </div>
            </div>
        )
    }

    getInputField(paramName, readOnly = false, parent, grandParentName, ggp) {
        const styles = this.getStyles();
        const editable = this.state[this.props.editable];

        const param = (editable[ggp] && editable[ggp][grandParentName] && editable[ggp][grandParentName][parent] && editable[ggp][grandParentName][parent][paramName]) ||
            (editable[grandParentName] && editable[grandParentName][parent] && editable[grandParentName][parent][paramName]) ||
            (editable[parent] && editable[parent][paramName]) ||
            editable[paramName];

        if (typeof param === 'object') {
            const keys = Object.keys(param);

            const res = keys.map((name) => {
                return this.getInputField(name, readOnly, paramName, parent, grandParentName);
            });

            return (
                <div style={styles.objectStyles}>
                    <span>{paramName}:</span>
                    {res}
                </div>
            )
        }

        if (readOnly) {
            return (
                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>{paramName}:</span>
                    <span> {param} </span>
                </div>
            );
        }

        return (
            <div style={styles.divStyles}>
                <span style={styles.spanStyles}>{paramName}:</span>
                <input id={paramName} type="text" onChange={(e) => {this.update(paramName, parent, grandParentName, ggp, e)}} value={param}/>
            </div>
        );
    }

    getStyles() {
        return {
            divStyles: {
                padding: 5
            },
            spanStyles: {
                marginRight: 5
            },
            objectStyles: {
                marginLeft: 10
            }
        }
    }
}

export default Radium(Editor);