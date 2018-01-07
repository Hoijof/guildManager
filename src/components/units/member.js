import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Member extends React.Component {
    static proptypes = {
        member: proptypes.object.isRequired,
        expel: proptypes.func,
        recruit: proptypes.func,
        itemKey: proptypes.any.isRequired
    };

    getImgSrc() {
        let imgSrc = 'img/faces2.png';
        return imgSrc;
    }

    expel() {
        const styles = this.getStyles();

        if (typeof this.props.expel === 'function') {
            return (
                <button style={[styles.button, styles.expel]} onClick={this.props.expel} data-id={this.props.itemKey} >
                    Expel
                </button>
            );
        }
    }

    recruit() {
        const styles = this.getStyles();

        if (typeof this.props.recruit === 'function') {
            return (
                <button style={[styles.button, styles.recruit]} onClick={this.props.recruit} data-id={this.props.itemKey} >
                    Expel
                </button>
            );
        }
    }

    render() {
        const styles = this.getStyles();

        const member = this.props.member;

        return (
            <div style={styles.memberBox}>
                <div style={styles.img}> </div>
                <p style={styles.p}>{member.name}</p>
                <p style={styles.p}>Age: {member.age}</p>
                <p style={styles.p}>Lvl: {member.getTotalLevel()}</p>
                <p style={styles.p}>Talent: {member.talent}</p>
                <p style={styles.p}>Price: {member.computePrice()}</p>
                {this.expel()}
                {this.recruit()}
            </div>
        )
    }

    getStyles() {
        return {
            memberBox: {
                border: '1px solid black',
                width: 150,
                height: 200,
                float: 'left',
                margin: 15
            },
            img: {
                width: 32,
                height: 32,
                backgroundImage: `url('${this.getImgSrc()}')`,
                backgroundPositionX: this.getPositionX(),
                backgroundPositionY: this.getPositionY(),
            },
            button: {
                cursor: 'pointer'
            },
            expel: {
                backgroundColor: 'red',
                color: 'white'
            },
            recruit: {
                backgroundColor: 'green',
                color: 'white'
            },
            p: {
                margin: 5
            }
        }
    }

    getPositionX() {
        return this.props.member.portrait.x * 32;
    }
    getPositionY() {
        return this.props.member.portrait.y * 32;
    }
}

export default Radium(Member);