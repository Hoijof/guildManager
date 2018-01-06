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
    store.data.characterId = 0;
    store.data.guildId = 0;
    store.data.world.addGuild(Object.create(guild).init());
    store.data.world.guilds[0].addMember(Object.create(character).init());
} else {
    store.data.world.__proto__ = world;

    store.data.world.guilds.forEach((g) => {
       g.__proto__ = guild;
       g.members.forEach(protoCharacter);
       g.buildings.forEach(protoBuilding);
       g.items.forEach(protoItem);
    });

    store.data.world.market.items.forEach(protoItem);

    function protoCharacter(c) {
        c.__proto__ = character;
        for (let i in c.items) {
            if (c.items[i] != null) {
                protoItem(c.items[i]);
            }
        }
    }

    function protoItem(i) {
        i.__proto__ = item;
    }

    function protoBuilding(b) {
        b.__proto__ = building;
    }
}

store.guild = store.data.world.guilds[0];
store.character = store.guild.members[0];


store.data.world.callADay();

// Have to solve how routes work yet
store.currentComponent = <Editor editable={store.character} id={0}/>;

window.onbeforeunload = function() {
    store.persist();
};

ReactDOM.render(
    <App component={window.store.currentComponent}/>,
    document.getElementById('root')
);