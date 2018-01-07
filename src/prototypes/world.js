import editable from './editable';
import item from './item';
import tools from "../tools";
import character from "./character";
import quest from './quest';

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
        this.guilds.forEach((guild) => {
            guild.callADay();
        });

        this.populateMarket();

        this.populateRecruits();

        this.populateQuests();

        this.day++;
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
    addGuild(guild) {
        this.guilds.push(guild);

        guild.id = this.guilds.length - 1;
    },
    populateQuests() {
        this.guilds.forEach((guild) => {
            let quests = tools.getRandomInt(1, 5);
            quests += guild.renown / 50;

            guild.quests = [];

            guild.addQuest(Object.create(quest).init(0, 'Clean', 0, (g, c) => {
                g.cleanness += c.level * 10;
            }));
            guild.addQuest(Object.create(quest).init(0, 'Repair', 0, (g, c) => {
                g.repairs += c.level * 10;
            }));
            guild.addQuest(Object.create(quest).init(0, 'Guard', tools.getRandomInt(4,6), 'none'));
            guild.addQuest(Object.create(quest).init(0, 'Rob', tools.getRandomInt(4,6), 'none'));
            guild.defaultQuests = 4;

           for (let i = 0; i < quests; i++) {
               guild.addQuest(Object.create(quest).init());
           }
        });
    }
};