import building from './building';
import editable from './editable';
import item from './item';
import tools from '../tools';
import quest from "./quest";

export default {
    __proto__: editable,
    openValues: [],
    closedValues: ['gold', 'renown', 'quests'],
    openValues: ['gold', 'renown', 'members', 'buildings', 'items'],
    closedValues: ['id', 'quests'],
    init(id, debug = false) {
        this.id = id;
        this.members = [];
        this.logs = [];
        this.quests = [];
        this.defaultQuests = 0;

        this.buildings = this.getDefaultBuildings();

        this.gold = 0;

        this.items = this.getRandomItems();

        this.renown = 0;
        this.totalQuests = 0;

        this.cleanness = 100;
        this.repairs = 100;

        if (debug) {
            this.openValues = ['gold', 'renown', 'members', 'buildings', 'items'];
            this.closedValues = ['id'];
        }

        return this;
    },
    getDefaultBuildings() {
        return [
            Object.create(building).init('Hall'),
            Object.create(building).init('warriors Hall')
        ];
    },
    getRandomItems() {
        const rand = tools.getRandomInt(3,5);
        const items = [];

        for (let i = 0; i < rand; ++i) {
            items.push(Object.create(item).init(1));
            this.log('Added random Object');
        }

        return items;
    },
    addMember(character) {
        this.members.push(character);
        this.log('Added member ' + character.name + ' ' + character.surname);
    },
    expelMember(character) {
        const idx = this.members.indexOf(character);
        this.members.splice(idx, 1);
        this.log('Expelled member ' + character.name + ' ' + character.surname);
    },
    log(m) {
        const message = `Day ${window.store.data.world.day}: ${m}`;

        this.logs.push(message);
    },
    addQuest(q) {
        this.quests.push(q);
    },
    removeQuest(quest) {
        const idx = this.quests.indexOf(quest);
        this.quests.splice(idx, 1);
    },
    callADay() {
        let questModificator = 0;

        const downgrade = this.members.length * 2;
        this.cleanness -= downgrade;
        this.repairs -= downgrade;

        if (this.cleanness < 0) {
            this.cleanness = 0;
            this.log('Cleanness is at 0. Quests will be harder.')
            questModificator++;
        }

        if (this.repairs < 0) {
            this.repairs = 0;
            this.log('Repairs are at 0. Quests will be harder.')
            questModificator++;
        }

        this.buildings.forEach((b) => {
            questModificator -= b.getEffect('quest');
        });

        questModificator = Math.floor(questModificator);

        this.members.forEach((member) => {
            if (member.quest !== null) {
                const quest = member.quest;

                quest.resolve(member, questModificator);

                if (quest.status === 'completed') {
                    const guildGold = Math.ceil(quest.gold * (1 - (member.share / 100)));
                    this.log('Member ' + member.name + ' finished quest ' + quest.name + ' and earned: ' + guildGold + 'g.');
                    this.gold += guildGold;
                    member.gold += Math.floor(quest.gold * member.share / 100);

                    member.completedQuests++;
                    member.exp += (quest.level || 1) + Math.floor(((quest.level || 1) / member.level) * (quest.level || 1) * 2);
                    this.completedQuests++;
                    this.renown += quest.level;

                    // Add rewards
                    if (quest.reward !== 'none') {
                        if (typeof quest.reward === 'function') {
                            quest.reward(this, member);
                        } else {
                            member.addItem(quest.reward);
                        }
                    }

                } else {
                    this.log('Member ' + member.name + ' FAILED quest ' + quest.name);
                }

                member.quest = null;

                if (member.levelUp()) {
                    this.log('Member ' + member.name + ' leveled up to lvl ' + member.level);
                }
            }
        });

        if (this.cleanness > 100) {
            this.cleanness = 100;
        }

        if (this.repairs > 100) {
            this.repairs = 100;
        }
    }
}