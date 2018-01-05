import React from 'react';
import Character from './characterEdition'
import Radium from 'radium';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.characterEdition = this.characterEdition.bind(this);
    }

    characterEdition() {
        this.props.changeActiveComponent(<Character/>);
    }

    render() {
        const ulSyles = {
            listStyleType: 'none',
            margin: 5,
            padding: 0
        };

        const liStyles = {
            display: 'block',
            padding: '1em',
            backgroundColor: 'LightGray',
            textAlign: 'center',
            marginBottom: '0.2em',
            textDecoration: 'none',
            color: 'black',
            width: '6em',
            ':hover': {
                backgroundColor: 'LightCoral',
                cursor: 'pointer'
            }
        };

        return (
            <nav>
                <ul style={ulSyles}>
                    <li style={liStyles} onClick={this.characterEdition}>Character</li>
                </ul>
            </nav>
        );
    }
}

export default Radium(Menu);