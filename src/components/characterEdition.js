import React from 'react';
import Radium from "radium";

class CharacterEdition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            character: window.store.data.character
        }
    }

    updateCharacter(paramName, e) {
        const newCharacter = this.state.character.update(paramName, e.target.value);

        window.store.data.character = newCharacter;

        this.setState({
            character: newCharacter
        })

    }

    render () {
        const formStyles = {
            width: 300
        };

        return (
            <div>
                <h3>Character edition</h3>

                <div style={formStyles}>
                    {this.state.character.openValues.map((name) => { return this.getInputField(name)})}
                    {this.state.character.closedValues.map((name) => { return this.getInputField(name, true)})}
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
                    <span> {this.state.character[paramName]} </span>
                </div>
            );
        }

        return (
            <div style={divStyles}>
                <span style={spanStyles}>{paramName}:</span>
                <input id={paramName} type="text" onChange={(e) => {this.updateCharacter(paramName, e)}} value={this.state.character[paramName]}/>
            </div>
        );
    }
}

export default Radium(CharacterEdition);