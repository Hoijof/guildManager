import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";

import Member from '../units/member';

class Members extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            guild: props.guild
        };

        this.expel = this.expel.bind(this);
    }

    expel(e) {
        this.state.guild.expelMember(e.target.getAttribute('data-id'));

        this.forceUpdate();
    }

    render() {
        const styles = this.getStyles();

        return (
            <div>
                <h1 style={styles.title}>MEMBERS!</h1>
                <ul>
                    {this.state.guild.members.map((member, key) => {
                        return (
                            <Member member={member} expel={this.expel} itemKey={key} />
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