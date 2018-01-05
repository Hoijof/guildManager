import building from './building';
import editable from './editable';

export default {
    __proto__: editable,
    openValues: [],
    closedValues: ['gold', 'renown'],
    init(id, debug = false) {
        this.id = id;
        this.members = [];

        this.buildings = this.getDefaultBuildings();

        this.gold = 0;

        this.items = {
            weapons: [
                {
                    type: 'weapon',
                    level: 1,
                    name: 'wood'
                }
            ],
            armors: [],
            accessories: []
        };

        this.renown = 0;

        if (debug) {
            this.openValues = ['gold', 'renown', 'members', 'buildings', 'items'];
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