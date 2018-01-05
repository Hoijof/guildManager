import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import store from './store';
import App from './components/app';

import Editor from './components/editor';

import character from './prototypes/character';
import guild from './prototypes/guild';
import world from'./prototypes/world';

window.store = store;

localStorage.setItem('gm', null);

let debug = true;

const res = store.load({
    character: Object.create(character).init(0, debug),
    guild: Object.create(guild).init(0, debug),
    world: Object.create(world).init(debug)
});

if (!res) {
    store.data.world.addCharacter(store.data.character);
    store.data.world.addGuild(store.data.guild);
}


store.data.character.__proto__ = character;

// Have to solve how routes work yet
store.currentComponent = <Editor editable="character"/>;

window.onbeforeunload = function() {
    store.persist();
};

ReactDOM.render(
    <App component={window.store.currentComponent}/>,
    document.getElementById('root')
);