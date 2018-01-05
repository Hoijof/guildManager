import itemNames from './consts/itemNames';

export default {
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },
    rollDice() {
        return Math.random() * 100;
    },
    getRandomItemName() {
        return this.getRandomFromList(itemNames);
    },
    getRandomFromList(list) {
        return list[this.getRandomInt(0, list.length - 1)];
    }
}