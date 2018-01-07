import React from 'react';
import Menu from './menu';
import Radium from "radium";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.status = 'Started';

        this.state = {
            component: this.props.component,
            character: window.store.character
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
        const sideMenuStyles = {
            height: '100%',
            backgroundColor: 'black',
            width: '150px',
            float: 'left'
        };

        const mainContainerStyles = {
            padding: 10,
            overflow: 'auto'
        };
        const mainDivStyles = {};

        return (
            <div id="mainDiv" style={mainDivStyles} className="mainDiv">

                <div style={sideMenuStyles}>
                    <Menu changeActiveComponent={this.changeActiveComponent} character={this.state.character}/>
                </div>

                <div style={mainContainerStyles}>
                    {this.state.component}
                </div>

            </div>
        )
    }
}

export default Radium(App);