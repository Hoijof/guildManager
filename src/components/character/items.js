import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

import Item from '../units/item';

class Items extends React.Component {
    constructor(props) {
        super(props);

        this.equipItem = this.equipItem.bind(this);
        this.unequipItem = this.unequipItem.bind(this);
    }

    static propTypes = {
        character: proptypes.object.isRequired
    };

    equipItem(e) {
        const item = this.props.character.items[e.target.getAttribute('data-id')];

        this.props.character.equipItem(item);

        this.forceUpdate();
    }

    unequipItem(e) {
        const item = this.props.character.equipment[e.target.getAttribute('data-id')];

        this.props.character.unequipItem(item);

        this.forceUpdate();
    }

    render() {
        const styles = this.getStyles();

        return (
            <div style={styles.main}>
                <div style={styles.section}>
                    <p>Your equipped Items</p>
                    Weapon: <Item key={'weapon'} itemKey={'weapon'} item={this.props.character.equipment.weapon} unequip={this.unequipItem}/>
                    Armor: <Item key={'armor'} itemKey={'armor'} item={this.props.character.equipment.armor} unequip={this.unequipItem}/>
                    Accessory: <Item key={'accessory'} itemKey={'accessory'} item={this.props.character.equipment.accessory} unequip={this.unequipItem}/>
                </div>
                <div style={styles.section}>
                    <p>Your items:</p>
                    {this.props.character.items.map((item, key) => {
                        return (
                            <Item key={key} itemKey={key} item={item} equip={this.equipItem}/>
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

export default Radium(Items);