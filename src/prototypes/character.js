import editable from './editable';
import names from '../consts/characterNames';
import tools from '../tools';

export default {
    __proto__: editable,
    openValues: ['name', 'surname' ],
    closedValues: ['age', 'gold', 'level', 'completedQuest', 'energy', 'items'],
    // openValues: ['items', 'name', 'surname', 'age', 'gold', 'level', 'completedQuests', 'energy', 'talent', 'exp'],
    // closedValues: ['id'],
    init(id, debug = false) {
        this.id = id;

        this.name = tools.rollDice() > 50 ? tools.getRandomFromList(names.maleNames) : tools.getRandomFromList(names.femaleNames);
        this.surname = tools.getRandomFromList(names.surnames);
        this.age = tools.getRandomInt(14, 80);

        this.energy = tools.getRandomInt(50, 100);
        this.maxEnergy = 100;

        this.gold = tools.getRandomInt(0, 100);
        this.items = {
            weapon: null,
            armor: null,
            accessory: null
        };

        this.completedQuests = tools.getRandomInt(0,20);
        this.level = tools.getRandomInt(1, 5);

        this.talent = this.getTalent();

        this.exp = 0;

        if (debug) {
            this.openValues = ['items', 'name', 'surname', 'age', 'gold', 'level', 'completedQuests', 'energy', 'talent', 'exp'];
            this.closedValues = ['id'];
        }

        this.price = this.computePrice();

        return this;
    },
    getTalent() {
        const roll = tools.rollDice();

        if (roll < 20) {
            return 5;
        }
        if (roll < 56) {
            return tools.rollDice() < 50 ? 4 : 6;
        }
        if (roll < 82) {
            return tools.rollDice() < 50 ? 3 : 7;
        }
        if (roll < 96) {
            return tools.rollDice() < 50 ? 2 : 8;
        }
        if (roll < 100) {
            return tools.rollDice() < 50 ? 1 : 10;
        }
    },
    computePrice() {
        const res = Math.round((this.level * 10) + (this.completedQuests * 2) +  this.gold/2 - this.age/4 + ((this.talent * 500) / this.age));

        return res > 15 ? res : 15;
    },
    addItem(item) {
        switch (item.type) {
            case 'weapon':
                this.items.weapon = item;
                break;
            case 'armor':
                this.items.armor = item;
                break;
            case 'accessory':
                this.items.accessory = item;
                break;
        }
    }
};