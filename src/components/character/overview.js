import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Overview extends React.Component {
    constructor(props) {
        super(props);
    }

    static proptypes = {
        character: proptypes.object.isRequired,
        guild: proptypes.object.isRequired
    };

    getImgSrc() {
        let imgSrc = 'img/faces2.png';
        return imgSrc;
    }

    render() {
        const styles = this.getStyles();

        return (
            <div>
                <h1 style={styles.title}>OVERVIEW!</h1>

                <div style={styles.img}> </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>Name:</span>
                    <span> {this.props.character.name} </span>
                </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>Surname:</span>
                    <span> {this.props.character.surname} </span>
                </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>Total Quests:</span>
                    <span> {this.props.character.completedQuests} </span>
                </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>Gold:</span>
                    <span> {this.props.character.gold} </span>
                </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>Lvl:</span>
                    <span> {this.props.character.level} </span>
                </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>Exp:</span>
                    <span> {this.props.character.exp} </span>
                </div>

                <div style={styles.divStyles}>
                    <span style={styles.spanStyles}>To next lvl:</span>
                    <span> {this.props.character.expToNextLevel()} </span>
                </div>
            </div>
        )
    }

    getStyles() {
        return {
            title: {
                textAlign: 'center',
                marginTop: 100
            },
            img: {
                width: 32,
                height: 32,
                backgroundImage: `url('${this.getImgSrc()}')`,
                backgroundPositionX: this.getPositionX(),
                backgroundPositionY: this.getPositionY(),
            },
            divStyles: {
                padding: 5
            },
            spanStyles: {
                marginRight: 5
            },
        }
    }

    getPositionX() {
        return this.props.character.portrait.x * 32;
    }
    getPositionY() {
        return this.props.character.portrait.y * 32;
    }
}

export default Radium(Overview);