import tools from '../tools';

export default {
    init(level, type, name) {
        this.portrait = {};
        this.type = type || tools.getRandomFromList(['weapon', 'armor', 'accessory']);
        this.level = level || tools.getRandomInt(1, 10);
        this.name = name || tools.getRandomItemName();
        this.displayName = this.getDisplayName();

        this.price = this.computePrice();

        return this;
    },
    getDisplayName() {
        if (this.type === 'weapon') {
            const name = tools.getRandomFromList(['Sword', 'Axe', 'Bow', 'Staff']);

            this.portrait = this.getPortrait(name);

            return name + ' of ' + this.name;
        }
        if (this.type === 'armor') {
            const name = tools.getRandomFromList(['Cuirass', 'Helmet', 'Shield']);

            this.portrait = this.getPortrait(name);

            return name + ' of ' + this.name;
        }
        if (this.type === 'accessory') {
            const name = tools.getRandomFromList(['Ring', 'Belt', 'Necklace']);

            this.portrait = this.getPortrait(name);

            return name + ' of ' + this.name;
        }
    },
    getPortrait(name) {
      switch (name) {
          case 'Sword':
              return {
                  x: -tools.getRandomInt(0, 3),
                  y: -tools.getRandomInt(4, 7)
              };
          case 'Axe':
              return {
                  x: -tools.getRandomFromList([0, tools.getRandomInt(4, 7)]),
                  y: 0
              };
          case 'Bow':
              return tools.getRandomFromList([
                  {
                      x: -1,
                      y: -1
                  },
                  {
                      x: 5,
                      y: 2
                  },
                  {
                      x: -4,
                      y: 1
                  }
              ]);
          case 'Staff':
              return {
                  x: -tools.getRandomInt(4, 7),
                  y: -tools.getRandomInt(3, 5)
              };
          case 'Cuirass':
              return {
                  x: tools.getRandomInt(1, 4),
                  y: tools.getRandomInt(1, 2)
              };
          case 'Helmet':
              return tools.getRandomFromList([{
                  x: tools.getRandomInt(1, 2),
                  y: 0
                }, {
                  x: tools.getRandomInt(3, 4),
                  y: -1
                }]);
          case 'Shield':
              return {
                  x: tools.getRandomInt(3, 4),
                  y: 0
                };
          case 'Ring':
              return tools.getRandomFromList([
                  {
                      x: 2,
                      y: -1
                  },
                  {
                      x: 4,
                      y: 4
                  },
                  {
                      x: -5,
                      y: -2
                  }
              ]);
          case 'Belt':
              return {
                  x: 3,
                  y: 3
              };
          case 'Necklace':
              return {
                  x: 4,
                  y: 3
              };
          default:
              return {
                  x: 0,
                  y: 0
              };
      }
    },
    computePrice() {
        const factor = tools.getRandomInt(0.8, 1.5);

        return Math.round(this.level * 15 * factor);
    },
    getSellPrice() {
        return Math.round(this.computePrice() * 0.8);
    }
}