import React from 'react';
import Menu from './menu';
import '../css/app.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.status = 'Started';

        this.state = {
            component: this.props.component
        };

        this.changeActiveComponent = this.changeActiveComponent.bind(this);
    }

    changeActiveComponent(newComponent) {
        window.store.data.currentComponent = newComponent;
        this.setState({
            component: newComponent
        });
    }


    render() {
        return <div id="mainDiv" className="mainDiv">

            <div className="sideMenu">
                <Menu changeActiveComponent={this.changeActiveComponent}/>
                <p>App Status: {this.status}</p>
            </div>

            <div className="mainContainer">
                {this.state.component}
            </div>

        </div>
    }
}