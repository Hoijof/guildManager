import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Market extends React.Component {
    constructor(props) {
        super(props);

        this.buyItem = this.buyItem.bind(this);

        this.state = {
            items: window.store.data.world.market.items,
            character: window.store.data.world.characters[props.characterId]
        };
    }

    static propTypes = {
        characterId: proptypes.number.isRequired
    };

    buyItem(e) {
        const item = this.state.items[e.target.getAttribute('data-id')];

        if (this.state.character.gold >= item.price) {
            this.state.character.items.weapon = item;
            this.state.character.gold -= item.price;
            const idx = window.store.data.world.market.items.indexOf(item);
            window.store.data.world.market.items.splice(idx, 1);

            this.forceUpdate();
        }
    }

    canBuy(item, key) {
        if (this.state.character.gold >= item.price) {
            return <a href="#" onClick={this.buyItem} data-id={key}>buy</a>;
        } else {
            return <span>buy</span>;
        }
    }

    render() {
        const styles = this.getStyles();

        return (
          <div style={styles.main}>
            <p>Items for sale:</p>
            <ul>
                {this.state.items && this.state.items.map((item, key) => {
                    return (
                        <li key={item.displayName}>
                            <p>Name: {item.displayName}</p>
                            <p>Type: {item.type}</p>
                            <p>Level: {item.level}</p>
                            <p>Price: {item.price}</p>

                            {this.canBuy(item, key)}
                        </li>
                    )
                })}
            </ul>
          </div>
        );
    }

    getStyles() {
        return {
            main: {
                color: 'black'
            }
        }
    }
}

export default Radium(Market);