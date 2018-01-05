import editable from './editable';

export default {
    __proto__: editable,
    openValues: [],
    closedValues: ['name'],

    init(debug = false) {
        this.guilds = [];
        this.name = "Tainor";

        if (debug) {
            this.openValues = ['name'];
            this.closedValues = [];
        }

        return this;
    }
};