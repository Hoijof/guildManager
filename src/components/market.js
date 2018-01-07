import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

import Item from './item';

class Market extends React.Component {
    constructor(props) {
        super(props);

        this.buyItem = this.buyItem.bind(this);
        this.sellItem = this.sellItem.bind(this);

        this.state = {
            items: window.store.data.world.market.items,
            character: props.character
        };
    }

    static propTypes = {
        character: proptypes.object.isRequired
    };

    buyItem(e) {
        const item = this.state.items[e.target.getAttribute('data-id')];

        if (this.state.character.gold >= item.price) {
            this.state.character.equipItem(item);
            this.state.character.gold -= item.price;

            const idx = window.store.data.world.market.items.indexOf(item);
            window.store.data.world.market.items.splice(idx, 1);

            this.forceUpdate();
        }
    }

    sellItem(e) {
        const id = e.target.getAttribute('data-id');
        const item = this.state.character.items[id];

        this.state.character.removeItem(id);

        this.state.character.gold += item.getSellPrice();

        this.forceUpdate();
    }

    canBuy(item, key) {
        if (this.state.character.gold >= item.price) {
            return this.buyItem;
        } else {
            return null;
        }
    }

    render() {
        const styles = this.getStyles();

        return (
            <div style={styles.main}>
                <div style={styles.section}>
                    <p>Your items</p>
                        {this.state.character.items.map((item, key) => {
                            return (
                                <Item key={key} itemKey={key} item={item} sell={this.sellItem}/>
                            )
                        })}
                </div>
                <div style={styles.section}>
                    <p>Items for sale:</p>
                        {this.state.items && this.state.items.map((item, key) => {
                            return (
                                <Item key={key} itemKey={key} item={item} buy={this.canBuy(item, key)}/>
                            )
                        })}
                </div>
            </div>
        );
    }

    getStyles() {
        return {
            main: {
                color: 'black'
            },
            section: {
                clear: 'both'
            }
        }
    }
}

export default Radium(Market);