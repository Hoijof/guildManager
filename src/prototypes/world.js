import editable from './editable';
import item from './item';
import tools from "../tools";
import character from "./character";

export default {
    __proto__: editable,
    openValues: [],
    closedValues: ['name'],

    init(debug = false) {
        this.characters = [];
        this.guilds = [];
        this.recruits = [];

        this.market = {
            totalSold: 0,
            items: []
        };

        this.name = "Tainor";
        this.day = 1;

        if (debug) {
            this.openValues = ['name', 'day'];
            this.closedValues = ['characters', 'guilds', 'market'];
        }

        return this;
    },
    callADay() {
        this.day++;

        this.populateMarket();

        this.populateRecruits();
    },
    populateMarket() {
        const it = tools.getRandomInt(3,10);

        this.market.items = [];

        for (let i = 0; i < it; i++) {
            const randomFactor = tools.getRandomInt(1, 10);
            this.market.items.push(Object.create(item).init(randomFactor))
        }
    },
    populateRecruits() {
        this.recruits = [];
        const it = tools.getRandomInt(10,10);

        for (let i = 0; i < it; i++) {
            this.recruits.push(Object.create(character).init());
        }
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