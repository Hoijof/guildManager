import React from 'react';
import Editor from './editor';
import Radium from 'radium';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.openEditor = this.openEditor.bind(this);
    }

    openEditor(e) {
        this.props.changeActiveComponent(<Editor editable={e.target.getAttribute('data-prototype')}/>);
    }

    render() {
        const styles = this.getStyles();

        return (
            <nav>
                <ul style={styles.ulSyles}>
                    <li style={[styles.liStyles]} key="character" onClick={this.openEditor} data-prototype="character">Edit Character</li>
                    <li style={[styles.liStyles]} key="guild" onClick={this.openEditor} data-prototype="guild">Edit Guild</li>
                    <li style={[styles.liStyles]} key="world" onClick={this.openEditor} data-prototype="world">Edit World</li>
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
            }
        }
    }
}

export default Radium(Menu);