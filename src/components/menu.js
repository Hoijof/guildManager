import React from 'react';
import Radium from 'radium';

import Editor from './editor';
import Market from './market';
import Recruit from './recruit';
import Guild from './guild';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.openEditor = this.openEditor.bind(this);
        this.openMarket = this.openMarket.bind(this);
        this.openRecruit = this.openRecruit.bind(this);
        this.openGuild = this.openGuild.bind(this);
    }

    openEditor(e) {
        this.props.changeActiveComponent(<Editor editable={e.target.getAttribute('data-prototype')} id={e.target.getAttribute('data-id')}/>);
    }

    openMarket(e) {
        this.props.changeActiveComponent(<Market characterId={window.store.data.character.id} /> );
    }

    openRecruit(e) {
        this.props.changeActiveComponent(<Recruit characterId={window.store.data.character.id} /> );
    }

    openGuild(e) {
        this.props.changeActiveComponent(<Guild /> );
    }

    render() {
        const styles = this.getStyles();

        return (
            <nav>
                <ul style={styles.ulSyles}>
                    <li style={[styles.liStyles]} key="characters" onClick={this.openEditor} data-prototype="characters" data-id="0">Edit Character</li>
                    <li style={[styles.liStyles]} key="s" onClick={this.openEditor} data-prototype="guilds" data-id="0">Edit Guild</li>
                    <li style={[styles.liStyles]} key="world" onClick={this.openEditor} data-prototype="world" data-id="-1">Edit World</li>
                    <li style={[styles.liStyles]} key="market" onClick={this.openMarket} >Market</li>
                    <li style={[styles.liStyles]} key="recruit" onClick={this.openRecruit} >Recruit</li>
                    <li style={[styles.liStyles]} key="guild" onClick={this.openGuild} >Guild</li>
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
                width: '100px',
                ':hover': {
                    backgroundColor: 'LightCoral',
                    cursor: 'pointer'
                }
            }
        }
    }
}

export default Radium(Menu);