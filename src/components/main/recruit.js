import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

import Member from '../units/member';

class Recruit extends React.Component {
    constructor(props) {
        super(props);

        this.buyRecruit = this.buyRecruit.bind(this);

        this.state = {
            recruits: window.store.data.world.recruits,
            character: props.character,
            guild: window.store.guild
        };
    }

    static propTypes = {
        character: proptypes.object.isRequired
    };

    buyRecruit(e) {
        const recruit = this.state.recruits[e.target.getAttribute('data-id')];

        if (this.state.guild.gold >= recruit.price) {
            this.state.guild.addMember(recruit);
            this.state.guild.gold -= recruit.price;
            const idx = window.store.data.world.recruits.indexOf(recruit);
            window.store.data.world.recruits.splice(idx, 1);

            this.forceUpdate();
        }
    }

    canBuy(recruit) {
        if (this.state.guild.gold >= recruit.price) {
            return this.buyRecruit;
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
                            <Member member={recruit} recruit={this.canBuy(recruit)} itemKey={key} />
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