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

// localStorage.setItem('gm', null);

if (!store.load()) {
    let debug = true;
    store.data.world = Object.create(world).init(debug);
    store.data.character = Object.create(character).init(debug);
    store.data.guild = Object.create(guild).init(debug);
    store.data.world.addCharacter(store.data.character);
    store.data.world.addGuild(store.data.guild);
    store.data.guild.addMember(store.data.character);
} else {
    store.data.character.__proto__ = character;
    store.data.world.__proto__ = world;
    store.data.guild.__proto__ = guild;
    store.data.guild.members.forEach(protoCharacter);
    store.data.guild.buildings.forEach(protoBuilding);
    store.data.guild.items.forEach(protoItem);

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