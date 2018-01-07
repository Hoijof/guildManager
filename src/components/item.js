import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Item extends React.Component {
    static proptypes = {
        item: proptypes.object.isRequired,
        buy: proptypes.func,
        sell: proptypes.func,
        itemKey: proptypes.any.isRequired
    };

    getImgSrc() {
        let imgSrc = 'img/';

        switch(this.props.item && this.props.item.type) {
            case 'weapon':
                imgSrc += 'axe.png';
                break;
            case 'armor':
                imgSrc += 'armor.png';
                break;
            case 'accessory':
                imgSrc += 'ring.png';
                break;
        }

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

    render() {
        const styles = this.getStyles();

        const item = this.props.item;

        return (
            <div style={styles.itemBox}>
                <img style={styles.img} src={this.getImgSrc()} />
                <p style={styles.p}>{item.displayName}</p>
                <p style={styles.p}>Lvl:{item.level}</p>
                <p style={styles.p}>Price: {item.price}</p>
                {this.buy()}
                {this.sell()}
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
                height: 32
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
}

export default Radium(Item);