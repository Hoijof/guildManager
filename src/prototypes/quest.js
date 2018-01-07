import tools from '../tools';
import item from './item';
import questNames from '../consts/questNames';

export default {
    openValues: [],
    closedValues: ['gold', 'renown'],

    init(level, name, gold, reward) {
        this.name = name || this.getRandomName();

        this.level = level >= 0 ? level : this.getRandomLevel();

        this.reward = reward || this.getRandomRewards();

        this.gold = gold || this.getRandomGold();

        this.status = 'pending';


        return this;
    },
    getRandomGold() {
        return Math.ceil(Math.pow(this.level * 2, 2) * tools.getRandomInt(0.5, 1.5));
    },
    getRandomLevel() {
        return tools.getRandomInt(1, 10);
    },
    getRandomRewards() {
        const reward = [];
        const roll = tools.rollDice();

        if (roll < 5) {
            this.addRewardByChance(4, reward);
        } else if (roll < 15) {
            this.addRewardByChance(3, reward);
        } else if (roll < 25) {
            this.addRewardByChance(2, reward);
        } else if (roll < 40) {
            this.addRewardByChance(1, reward);
        } else if (roll < 90) {
            this.addRewardByChance(0, reward);
        } else {
            this.addRewardByChance(0, reward);
        }

        return reward[0];
    },
    addRewardByChance(level, reward) {
        const randomFactor = tools.getRandomInt(0.5, 1.5);
        const objectLevel = Math.floor((this.level + level) * randomFactor) || 1;

        reward.push(Object.create(item).init(objectLevel));
    },
    getRandomName() {
        const action = tools.getRandomFromList(questNames.actions);

        return action.name + questNames.names[tools.getRandomFromList(action.links)];
    },
    resolve(character, modificator) {
        const rand = tools.rollDice() < 50 ? 1 : -1;
        const itemLevel = character.getTotalItemLevel();

        if (character.level + rand + itemLevel >= this.level + modificator) {
            this.status = 'completed';
        } else {
            this.status = 'failed';
        }
    }
}