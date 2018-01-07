import React from 'react';
import Radium from 'radium';

import Editor from './editor';
import Market from './market';
import Recruit from './recruit';
import Guild from './guild';
import Character from './character';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.openEditorGuild = this.openEditorGuild.bind(this);
        this.openEditorWorld = this.openEditorWorld.bind(this);
        this.openEditorCharacter = this.openEditorCharacter.bind(this);
        this.openCharacter = this.openCharacter.bind(this);
        this.openMarket = this.openMarket.bind(this);
        this.openRecruit = this.openRecruit.bind(this);
        this.openGuild = this.openGuild.bind(this);
        this.callADay = this.callADay.bind(this);

        this.state = {
            character: props.character
        };
    }

    openEditorGuild(e) {
        const editable = window.store.guild;

        this.props.changeActiveComponent(<Editor editable={editable}/>);
    }
    openEditorWorld(e) {
        const editable = window.store.data.world;

        this.props.changeActiveComponent(<Editor editable={editable}/>);
    }
    openEditorCharacter(e) {
        const editable = window.store.character;

        this.props.changeActiveComponent(<Editor editable={editable}/>);
    }

    openCharacter() {
        this.props.changeActiveComponent(<Character character={window.store.character} guild={window.store.guild}/> );
    }

    openMarket() {
        this.props.changeActiveComponent(<Market character={window.store.character} /> );
    }

    openRecruit() {
        this.props.changeActiveComponent(<Recruit character={window.store.character} /> );
    }

    openGuild() {
        this.props.changeActiveComponent(<Guild /> );
    }

    callADay() {
        window.store.data.world.callADay();

        this.openGuild()

        this.forceUpdate();
    }

    render() {
        const styles = this.getStyles();

        return (
            <nav>
                <ul style={styles.ulSyles}>
                    <li style={[styles.liStyles, styles.white]}>
                        Level: {this.state.character.getTotalLevel()}
                    </li>
                    <li style={[styles.liStyles]} key="characters" onClick={this.openEditorCharacter} data-prototype="character" data-id="0">Edit Character</li>
                    <li style={[styles.liStyles]} key="s" onClick={this.openEditorGuild} data-prototype="guilds" data-id="0">Edit Guild</li>
                    <li style={[styles.liStyles]} key="world" onClick={this.openEditorWorld} data-prototype="world" data-id="-1">Edit World</li>
                    <li style={[styles.liStyles]} key="character" onClick={this.openCharacter} >Character</li>
                    <li style={[styles.liStyles]} key="market" onClick={this.openMarket} >Market</li>
                    <li style={[styles.liStyles]} key="recruit" onClick={this.openRecruit} >Recruit</li>
                    <li style={[styles.liStyles]} key="guild" onClick={this.openGuild} >Guild</li>
                    <li style={[styles.liStyles]} key="cad" onClick={this.callADay} >Call a day</li>
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
            },
            white: {
                color: 'white'
            }
        }
    }
}

export default Radium(Menu);