import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Quest extends React.Component {
    static proptypes = {
        quest: proptypes.object.isRequired,
        assign: proptypes.func,
        itemKey: proptypes.any.isRequired
    };

    getImgSrc() {
        let imgSrc = 'img/quest.png';
        return imgSrc;
    }


    assign() {
        const styles = this.getStyles();

        if (typeof this.props.assign === 'function') {
            return (
                <button style={[styles.button, styles.assign]} onClick={this.props.assign} data-id={this.props.itemKey} >
                    Assign
                </button>
            );
        }
    }

    render() {
        const styles = this.getStyles();

        const quest = this.props.quest;

        return (
            <div style={styles.questBox}>
                <img style={styles.img} src={this.getImgSrc()} />
                <p style={styles.p}>{quest.name}</p>
                <p style={styles.p}>Lvl:{quest.level}</p>
                <p style={styles.p}>Price: {quest.gold}</p>
                {this.assign()}
            </div>
        )
    }

    getStyles() {
        return {
            questBox: {
                border: '1px solid black',
                width: 150,
                height: 150,
                float: 'left',
                margin: 15
            },
            img: {
                width: 32,
                height: 32
            },
            button: {
                cursor: 'pointer'
            },
            assign: {
                backgroundColor: 'green',
                color: 'white'
            },
            sell: {
                backgroundColor: 'yellow',
                color: 'white'
            },
            p: {
                margin: 5
            }
        }
    }
}

export default Radium(Quest);