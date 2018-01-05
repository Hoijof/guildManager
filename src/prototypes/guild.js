import building from './building';

export default {
    openValues: [],
    closedValues: ['gold', 'renown'],
    init(id, debug = false) {
        this.id = id;
        this.members = [];

        this.buildings = this.getDefaultBuildings();

        this.gold = 0;

        this.items = {
            weapons: [],
            armors: [],
            accessories: []
        };

        this.renown = 0;

        if (debug) {
            this.openValues = ['gold', 'renown'];
            this.closedValues = ['id'];
        }

        return this;
    },
    getDefaultBuildings() {
        return {
            hall: Object.create(building).init('Hall'),
            warriorsHall: Object.create(building).init('warriors Hall'),
        }
    }
}