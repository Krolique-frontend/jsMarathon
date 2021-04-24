export default class Fighter {
    constructor(char, playerNum) {
        this.player = playerNum;
        this.name = char.name;
        this.hp = char.hp;
        this.img = char.img;
        this.weapon = char.weapon;
    }

    attack() {
        console.log(`${this.name} Fight...`);
    }

    elHP() {
        return document.querySelector(`.${this.player} .life`);
    }

    renderHP() {
        this.elHP().style.width = `${this.hp}%`;
    }

    changeHP(value) {
        this.hp -= value;
    }
}