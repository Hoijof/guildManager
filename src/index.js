import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import store from './store';
import App from './components/app';

import Editor from './components/editor';

import character from './prototypes/character';
import guild from './prototypes/guild';
import world from './prototypes/world';
import item from './prototypes/item';
import building from './prototypes/building';

window.store = store;

localStorage.setItem('gm', null);

if (!store.load()) {
    let debug = true;

    store.data.world = Object.create(world).init(debug);
    store.data.characterId = 0;
    store.data.guildId = 0;
    store.data.world.addCharacter(Object.create(character).init());
    store.data.world.addGuild(Object.create(guild).init());

    store.data.world.guilds[0].addMember(store.data.world.characters[0]);
} else {
    store.data.world.__proto__ = world;
    store.data.world.characters.forEach(protoCharacter);

    store.data.world.guilds.forEach((g) => {
       g.__proto__ = guild;
       g.members.forEach(protoCharacter);
       g.buildings.forEach(protoBuilding);
       g.items.forEach(protoItem);
    });

    store.data.world.market.items.forEach(protoItem);

    function protoCharacter(c) {
        c.__proto__ = character;
    }

    function protoItem(i) {
        i.__proto__ = item;
    }

    function protoBuilding(b) {
        b.__proto__ = building;
    }
}



store.data.world.callADay();

// Have to solve how routes work yet
store.currentComponent = <Editor editable="characters" id={0}/>;

window.onbeforeunload = function() {
    store.persist();
};

ReactDOM.render(
    <App component={window.store.currentComponent}/>,
    document.getElementById('root')
);