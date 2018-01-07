import React from 'react';
import proptypes from 'prop-types';
import Radium from "radium";
import Menu from './guild/menu';

import Overview from './guild/overview';

class Guild extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            component: this.props.component || <Overview guild={window.store.data.world.guilds[window.store.data.guildId]}/>,
            guild: window.store.guild
        };

        this.changeActiveComponent = this.changeActiveComponent.bind(this);
    }

    changeActiveComponent(newComponent) {
        window.store.currentComponent = newComponent;
        this.setState({
            component: newComponent
        });
    }

    render() {
        const styles = this.getStyles();

        return (
            <div id="guildDiv" style={styles.mainDivStyles}>

                <div style={styles.sideMenuStyles}>
                    <Menu changeActiveComponent={this.changeActiveComponent} guild={this.state.guild}/>
                </div>

                <div style={styles.mainContainerStyles}>
                    {this.state.component}
                </div>

            </div>
        )
    }

    getStyles() {
        return {
            sideMenuStyles: {
                width: '100%',
                height: 60,
                backgroundColor: 'black',
                position: 'absolute',
                top: 0,
                left: 150
            },
            mainContainerStyles: {
                marginTop: 60,
            },
            mainDivStyles: {
                left: '150px'
            }
        }
    }
}

export default Radium(Guild);