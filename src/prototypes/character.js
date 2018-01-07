import editable from './editable';
import names from '../consts/characterNames';
import tools from '../tools';

export default {
    __proto__: editable,
    openValues: ['name', 'surname' ],
    closedValues: ['age', 'exp', 'gold', 'level', 'completedQuests', 'energy', 'items', 'equipment', 'quest'],
    // openValues: ['items', 'name', 'surname', 'age', 'gold', 'level', 'completedQuests', 'energy', 'talent', 'exp'],
    // closedValues: ['id'],
    init(id, debug = false) {
        this.id = id;

        this.name = tools.rollDice() > 50 ? tools.getRandomFromList(names.maleNames) : tools.getRandomFromList(names.femaleNames);
        this.surname = tools.getRandomFromList(names.surnames);
        this.age = tools.getRandomInt(14, 80);

        this.logs = [];

        this.portrait = {
            x: -tools.getRandomInt(0,15),
            y: -tools.getRandomInt(1,5)
        };

        this.energy = tools.getRandomInt(50, 100);
        this.maxEnergy = 100;

        this.gold = tools.getRandomInt(0, 100);
        this.items = [];
        this.equipment = {
            weapon: null,
            armor: null,
            accessory: null
        };

        this.quest = null;

        this.completedQuests = tools.getRandomInt(0,0);
        this.level = tools.getRandomInt(1, 5);

        this.talent = this.getTalent();

        this.exp = 0;

        if (debug) {
            this.openValues = ['items', 'name', 'surname', 'age', 'gold', 'level', 'completedQuests', 'energy', 'talent', 'exp'];
            this.closedValues = ['id'];
        }

        this.price = this.computePrice();

        this.share = 20; // share of quest money

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
        this.items.push(item);
    },
    equipItem(item, newItem = false) {
        debugger;
        if (this.equipment[item.type] != null) {
            this.unequipItem(this.equipment[item.type]);
        }

        this.equipment[item.type] = item;

        if (newItem === false) {
            this.removeItem(item);
        }
    },
    unequipItem(item) {
        this.equipment[item.type] = null;

        this.items.push(item);
    },
    removeItem(key) {
        if (typeof key === 'object') {
            key = this.items.indexOf(key);
        }

        this.items.splice(key, 1);
    },
    setQuest(quest) {
        this.quest = quest;
    },
    levelUp() {
        if (this.exp >= this.expToNextLevel()) {
            this.level++;
            this.exp = 0;

            this.log('Leveled up to level ' + this.level);

            return true;
        }

        return false;
    },
    expToNextLevel() {
        return this.level * 15;
    },
    getTotalLevel() {
      return this.level + this.getTotalItemLevel();
    },
    log(m) {
        const message = `Day ${window.store.data.world.day}: ${m}`;

        this.logs.push(message);
    },
    getTotalItemLevel() {
        const equipment = this.equipment;

        const wl = equipment.weapon ? equipment.weapon.level : 0;
        const al = equipment.armor ? equipment.armor.level : 0;
        const acl = equipment.accessory ? equipment.accessory.level : 0;

        return Math.floor(wl/2 + al/2 + acl/2);
    }
};