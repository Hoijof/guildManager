import editable from './editable';

export default {
    __proto__: editable,
    openValues: [],
    closedValues: ['name'],

    init(debug = false) {
        this.characters = [];
        this.guilds = [];
        this.name = "Tainor";

        if (debug) {
            this.openValues = ['name'];
            this.closedValues = ['characters', 'guilds'];
        }

        return this;
    },
    addCharacter(character) {
        this.characters.push(character);

        character.id = this.characters.length - 1;
    },
    addGuild(guild) {
        this.guilds.push(guild);

        guild.id = this.guilds.length - 1;
    }
};