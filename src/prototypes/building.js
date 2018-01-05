export default {
    init(name) {
        this.name = name;

        this.level = 1;

        this.effect = 1;

        return this;
    },
    getPrice() {
        let res = Math.pow(this.level, 2);
        res /= 20;

        return Math.round(res * 100);
    },
    upgrade() {
        this.level += 1;
        this.effect = Math.round(this.effect * 1.6)
    }
}