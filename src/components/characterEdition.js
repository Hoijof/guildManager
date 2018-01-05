import React from 'react';

export default class CharacterEdition extends React.Component {
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
        return (
            <div className="characterEdition">
                <h3>Character edition</h3>

                <div id="mainForm" className="form">
                    {this.state.character.openValues.map((name) => { return this.getInputField(name)})}
                    {this.state.character.closedValues.map((name) => { return this.getInputField(name, true)})}
                </div>
            </div>
        )
    }

    getInputField(paramName, readOnly = false) {
        if (readOnly) {
            return (
                <div>
                    <span>{paramName}:</span>
                    <span> {this.state.character[paramName]} </span>
                </div>
            );
        }

        return (
            <div>
                <span>{paramName}:</span>
                <input id={paramName} type="text" onChange={(e) => {this.updateCharacter(paramName, e)}} value={this.state.character[paramName]}/>
            </div>
        );
    }
}