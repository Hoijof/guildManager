import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

class Members extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            guild: window.store.data.guild
        }
    }

    render() {
        const styles = this.getStyles();

        return (
            <div>
                <h1 style={styles.title}>MEMBERS!</h1>
                <ul>
                    {this.state.guild.members.map((member) => {
                        return (
                            <li key={member.name+member.age+member.level}>
                                <p>Name: {member.name}</p>
                                <p>Age: {member.age}</p>
                                <p>Level: {member.level}</p>
                                <p>Talent: {member.talent}</p>
                                <p>Price: {member.computePrice()}</p>
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

export default Radium(Members);