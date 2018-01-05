import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import store from './store';
import App from './components/app';

import character from './prototypes/character';

window.store = store;

store.load({
    currentComponent: null,
    character: Object.create(character).init()
});

store.data.character.__proto__ = character;

// Have to solve how routes work yet
store.data.currentComponent = null;

window.onbeforeunload = function() {
    store.persist();
};

ReactDOM.render(
    <App component={window.store.currentComponent}/>,
    document.getElementById('root')
);