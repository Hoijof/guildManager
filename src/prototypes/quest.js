import tools from '../tools';

export default {
    openValues: [],
    closedValues: ['gold', 'renown'],

    init() {
        this.name = 'quest';

        this.level = this.getRandomLevel();

        this.rewards = this.getRandomRewards();


        return this;
    },
    getRandomLevel() {
        return tools.getRandomInt(1, 10);
    },
    getRandomRewards() {
        const rewards = [];
        const randomFactor = tools.getRandomInt(0.5, 1.5);

        rewards.push({
            name: 'gold',
            quantity: this.level * randomFactor * 5
        });

        const roll = tools.rollDice();

        if (roll < 5) {
            this.addRewardByChance(4);
        } else if (roll < 15) {
            this.addRewardByChance(3);
        } else if (roll < 25) {
            this.addRewardByChance(2);
        } else if (roll < 40) {
            this.addRewardByChance(1);
        } else if (roll < 90) {
            this.addRewardByChance(0);
        }
    },
    addRewardByChance(level) {
        const randomFactor = tools.getRandomInt(0.5, 1.5);

        this.rewards.push({
            type: tools.getRandomFromList(['weapon', 'armor', 'accessory']),
            value: (this.level + level) * randomFactor,
            name: tools.getRandomItemName()
        });
    }
}