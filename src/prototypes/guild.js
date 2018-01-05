import building from './building';
import editable from './editable';
import item from './item';
import tools from '../tools';

export default {
    __proto__: editable,
    openValues: [],
    closedValues: ['gold', 'renown'],
    init(id, debug = false) {
        this.id = id;
        this.members = [];
        this.logs = [];

        this.buildings = this.getDefaultBuildings();

        this.gold = 0;

        this.items = this.getRandomItems();

        this.renown = 0;
        this.totalQuests = 0;

        this.cleanness = 100;
        this.repairs = 100;

        if (debug) {
            this.openValues = ['gold', 'renown', 'members', 'buildings', 'items'];
            this.closedValues = ['id'];
        }

        return this;
    },
    getDefaultBuildings() {
        return [
            Object.create(building).init('Hall'),
            Object.create(building).init('warriors Hall')
        ];
    },
    getRandomItems() {
        const rand = tools.getRandomInt(3,5);
        const items = [];

        for (let i = 0; i < rand; ++i) {
            items.push(Object.create(item).init(1));
            this.log('Added random Object');
        }

        return items;
    },
    addMember(character) {
        this.members.push(character);
        this.log('Added member ' + character.name + ' ' + character.surname);
    },
    expelMember(character) {
        const idx = this.members.indexOf(character);
        this.members.splice(idx, 1);
        this.log('Expelled member ' + character.name + ' ' + character.surname);
    },
    log(m) {
        const message = `Day ${window.store.data.world.day}: ${m}`;

        this.logs.push(message);
    }
}