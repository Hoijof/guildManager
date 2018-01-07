import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

import Quest from '../quest';

class Quests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            guild: props.guild,
            member: window.store.character
        };

        this.assign = this.assign.bind(this);
    }

    assign(e) {
        const id = e.target.getAttribute('data-id');
        const quest = this.state.guild.quests[id];

        if (id >= this.state.guild.defaultQuests) {
            this.state.guild.removeQuest(quest);
        }

        this.state.member.setQuest(quest);

        this.forceUpdate();
    }

    render() {
        const styles = this.getStyles();

        return (
            <div>
                <h1 style={styles.title}>QUESTS!</h1>
                <ul>
                    {this.state.guild.quests.map((quest, key) => {
                        return (
                            <Quest quest={quest} assign={this.assign} itemKey={key} />
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

export default Radium(Quests);