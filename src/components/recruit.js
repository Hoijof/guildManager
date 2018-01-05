import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Recruit extends React.Component {
    constructor(props) {
        super(props);

        this.buyRecruit = this.buyRecruit.bind(this);

        this.state = {
            recruits: window.store.data.world.recruits,
            character: window.store.data.world.characters[props.characterId],
            guild: window.store.data.guild
        };
    }

    static propTypes = {
        characterId: proptypes.number.isRequired
    };

    buyRecruit(e) {
        const recruit = this.state.recruits[e.target.getAttribute('data-id')];

        if (this.state.character.gold >= recruit.price) {
            this.state.guild.members.push(recruit);
            this.state.character.gold -= recruit.price;
            const idx = window.store.data.world.recruits.indexOf(recruit);
            window.store.data.world.recruits.splice(idx, 1);

            this.forceUpdate();
        }
    }

    canBuy(recruit, key) {
        if (this.state.character.gold >= recruit.price) {
            return <a href="#" onClick={this.buyRecruit} data-id={key}>buy</a>;
        } else {
            return <span>buy</span>;
        }
    }

    render() {
        const styles = this.getStyles();

        return (
            <div style={styles.main}>
                <p>recruits available:</p>
                <ul>
                    {this.state.recruits && this.state.recruits.map((recruit, key) => {
                        return (
                            <li key={recruit.displayName}>
                                <p>Name: {recruit.name}</p>
                                <p>Age: {recruit.age}</p>
                                <p>Level: {recruit.level}</p>
                                <p>Talent: {recruit.talent}</p>
                                <p>Price: {recruit.price}</p>

                                {this.canBuy(recruit, key)}
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

export default Radium(Recruit);