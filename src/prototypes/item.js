import tools from '../tools';

export default {
    init(level, type, name) {
        this.type = type || tools.getRandomFromList(['weapon', 'armor', 'accessory']);
        this.level = level || tools.getRandomInt(1, 10);
        this.name = name || tools.getRandomItemName();
        this.displayName = this.getDisplayName();

        return this;
    },
    getDisplayName() {
        if (this.type === 'weapon') {
            return tools.getRandomFromList(['Sword', 'Axe', 'Bow', 'Staff']) + ' of ' + this.name;
        }
        if (this.type === 'armor') {
            return tools.getRandomFromList(['Vest', 'Helmet', 'Shield']) + ' of ' + this.name;
        }
        if (this.type === 'accessory') {
            return tools.getRandomFromList(['Ring', 'Belt', 'Collar']) + ' of ' + this.name;
        }
    }
}