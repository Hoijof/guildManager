import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Buildings extends React.Component {
    constructor(props) {
        super(props);

        this.canUpgrade = this.canUpgrade.bind(this);
        this.upgrade = this.upgrade.bind(this);
    }

    canUpgrade(building, key) {
        if (this.props.guild.gold >= building.getPrice()) {
            return <a href="#" onClick={this.upgrade} data-id={key}>buy</a>;
        } else {
            return <span>buy</span>;
        }
    }

    upgrade(e) {
        const building = this.props.guild.buildings[e.target.getAttribute('data-id')];
        const price = building.getPrice();

        if (this.props.guild.gold >= price) {
            building.upgrade();
            this.props.guild.gold -= price;

            this.forceUpdate();
        }
    }

    render() {
        const styles = this.getStyles();

        return (
            <div>
                <h1 style={styles.title}>BUILDINGS!</h1>
                <ul>
                    {this.props.guild.buildings.map((building, key) => {
                        return (
                            <li key={building.name}>
                                <p>Name: {building.name}</p>
                                <p>Level: {building.level}</p>
                                <p>Effect: {building.effect}</p>
                                <p>Price: {building.getPrice()}</p>

                                {this.canUpgrade(building, key)}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    getStyles() {
        return {
            title: {
                textAlign: 'center',
                marginTop: 100
            },
            divStyles: {
                padding: 5
            },
            spanStyles: {
                marginRight: 5
            },
        }
    }
}

export default Radium(Buildings);