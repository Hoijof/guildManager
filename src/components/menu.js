import React from 'react';
import Character from './characterEdition'
import '../css/menu.css'

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.characterEdition = this.characterEdition.bind(this);
    }

    characterEdition() {
        this.props.changeActiveComponent(<Character/>);
    }

    render() {
        return (
            <nav>
                <ul>
                    <li onClick={this.characterEdition}>Character</li>
                </ul>
            </nav>
        );
    }
}