import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

import item from '../prototypes/item';
import tools from '../tools';

class Market extends React.Component {
    constructor(props) {
        super(props);

        this.buyItem = this.buyItem.bind(this);

        this.state = {
            items: [],
            character: window.store.data.world.characters[props.characterId]
        };
    }

    static propTypes = {
        characterId: proptypes.number.isRequired
    };

    componentDidMount() {
        this.setState({
            items: this.generateItems()
        })
    }

    generateItems() {
        const it = tools.getRandomInt(3,10);
        const items = [];

        for (let i = 0; i < it; i++) {
            const randomFactor = tools.getRandomInt(0.5, 1.5);
            items.push(Object.create(item).init(this.state.character.level * randomFactor));
        }

        return items;
    }

    buyItem(e) {
        const item = this.state.items[e.target.getAttribute('data-id')]

        this.state.character.items.weapon = item;
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

                            <a href="#" onClick={this.buyItem} data-id={key}>buy</a>
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