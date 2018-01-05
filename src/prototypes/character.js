export default {
    init(name = 'Hoijof', surname = 'Golpeo') {
        this.name = name;
        this.surname = surname;
        this.age = 16;

        this.energy = 100;
        this.maxEnergy = 100;

        this.effects = [];

        return this;
    },

    update(paramName, value) {
        this[paramName] = value;

        return this;
    },

    openValues: ['name', 'surname'],
    closedValues: ['age', 'energy']
}