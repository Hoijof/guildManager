export default {
    openValues: ['name', 'surname'],
    closedValues: ['age', 'gold', 'level', 'completedQuest', 'energy'],
    init(id, debug = false) {
        this.id = id;

        this.name = 'Player';
        this.surname = 'Surname';
        this.age = 16;

        this.energy = 100;
        this.maxEnergy = 100;

        this.gold = 0;
        this.items = {
            weapon: null,
            armor: null,
            accessory: null
        };

        this.completedQuests = 0;
        this.level = 1;

        this.talent = Math.random(0,10);

        this.exp = 0;

        if (debug) {
            this.openValues = ['name', 'surname', 'age', 'gold', 'level', 'completedQuest', 'energy', 'talent', 'exp'];
            this.closedValues = ['id'];
        }

        return this;
    },

    update(paramName, value) {
        this[paramName] = value;

        return this;
    }
}