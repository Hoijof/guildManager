import itemNames from './consts/itemNames';

export default {
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },
    rollDice() {
        return Math.random() * 100;
    },
    getRandomItemName() {
        return this.getRandomFromList(itemNames);
    },
    getRandomFromList(list) {
        let res = this.getRandomInt(0, list.length);

        return list[res];
    }
}