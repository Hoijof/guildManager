import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.state[props.editable] = window.store.data[props.editable];
    }

    static propTypes = {
        editable: proptypes.string.isRequired
    };

    componentWillReceiveProps(nextProps) {
        const newState = [];
        newState[nextProps.editable] = window.store.data[nextProps.editable];
        this.setState(newState);
    }

    update(paramName, e) {
        const newItem = this.state[this.props.editable].update(paramName, e.target.value);

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

    getInputField(paramName, readOnly = false) {
        const divStyles = {
            padding: 5
        };

        const spanStyles = {
            marginRight: 5
        };

        if (readOnly) {
            return (
                <div style={divStyles}>
                    <span style={spanStyles}>{paramName}:</span>
                    <span> {this.state[this.props.editable][paramName]} </span>
                </div>
            );
        }

        return (
            <div style={divStyles}>
                <span style={spanStyles}>{paramName}:</span>
                <input id={paramName} type="text" onChange={(e) => {this.update(paramName, e)}} value={this.state[this.props.editable][paramName]}/>
            </div>
        );
    }
}

export default Radium(Editor);