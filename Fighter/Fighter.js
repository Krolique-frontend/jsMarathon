import { makeElement } from "../functions";

export default class Fighter {
    constructor(props, playerNum) {
        this.player = playerNum;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
        this.rootSelector = '.arenas';
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

        this.hp <= 0 ? this.hp = 0 : null;
    }

    createPlayer() {
        let playerDiv = makeElement('div', 'class', this.player);
        let progressBarDiv = makeElement('div', 'class', 'progressbar');
        let lifeDiv = makeElement('div', 'class', 'life');
        let nameDiv = makeElement('div', 'class', 'name');
        let charDiv = makeElement('div', 'class', 'character');
        let imgElement = makeElement('img', 'src', this.img);

        nameDiv.innerHTML = this.name;
        lifeDiv.style.width = `${this.hp}%`;

        progressBarDiv.appendChild(lifeDiv);
        progressBarDiv.appendChild(nameDiv);
        charDiv.appendChild(imgElement);
        playerDiv.appendChild(progressBarDiv);
        playerDiv.appendChild(charDiv);

        const root = document.querySelector(this.rootSelector);
        root.appendChild(playerDiv);

        return playerDiv;
    }
}