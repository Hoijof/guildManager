import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Item extends React.Component {
    static proptypes = {
        item: proptypes.object.isRequired,
        buy: proptypes.func,
        sell: proptypes.func,
        equip: proptypes.func,
        unequip: proptypes.func,
        itemKey: proptypes.any.isRequired
    };

    getImgSrc() {
        let imgSrc = 'img/weapons-and-equipment.png';

        return imgSrc;
    }


    buy() {
        const styles = this.getStyles();

        if (typeof this.props.buy === 'function') {
            return (
                <button style={[styles.button, styles.buy]} onClick={this.props.buy} data-id={this.props.itemKey} >
                    Buy
                </button>
            );
        }
    }

    sell() {
        const styles = this.getStyles();

        if (typeof this.props.sell === 'function') {
            return (
                <button style={[styles.button, styles.sell]} onClick={this.props.sell} data-id={this.props.itemKey} >
                    Sell
                </button>
            )
        }
    }

    equip() {
        const styles = this.getStyles();

        if (typeof this.props.equip === 'function') {
            return (
                <button style={[styles.button, styles.buy]} onClick={this.props.equip} data-id={this.props.itemKey} >
                    Equip
                </button>
            )
        }
    }

    unequip() {
        const styles = this.getStyles();

        if (typeof this.props.unequip === 'function') {
            return (
                <button style={[styles.button, styles.sell]} onClick={this.props.unequip} data-id={this.props.itemKey} >
                    Unequip
                </button>
            )
        }
    }

    render() {
        const item = this.props.item;

        if (item === null) return <div></div>;

        const styles = this.getStyles();

        return (
            <div style={styles.itemBox}>
                <div style={styles.img}> </div>
                <p style={styles.p}>{item.displayName}</p>
                <p style={styles.p}>Lvl:{item.level}</p>
                <p style={styles.p}>Price: {item.price}</p>
                {this.buy()}
                {this.sell()}
                {this.equip()}
                {this.unequip()}
            </div>
        )
    }

    getStyles() {
        return {
            itemBox: {
                border: '1px solid black',
                width: 150,
                height: 150,
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
            buy: {
                backgroundColor: 'green',
                color: 'white'
            },
            sell: {
                backgroundColor: 'yellow',
                color: 'black'
            },
            p: {
                margin: 5
            }
        }
    }

    getPositionX() {
        return this.props.item.portrait.x * 32;
    }
    getPositionY() {
        return this.props.item.portrait.y * 32;
    }
}

export default Radium(Item);