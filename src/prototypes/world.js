export default {
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