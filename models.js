function makeElement (tagName, attribute, attrValue) {
    let newElement = document.createElement(tagName);
    let newAttribute = document.createAttribute(attribute);

    newAttribute.value = attrValue;
    newElement.setAttributeNode(newAttribute);

    return newElement;
}

function createReloadButton() {
    const div = makeElement('div', 'class', 'reloadWrap');
    const button = makeElement('button', 'class', 'button');

    button.innerHTML = 'restart';
    div.appendChild(button);

    return button;
}

function restart() {
    player1.fighter.hp = 100;
    player2.fighter.hp = 100;

    player1.fighter.renderhp();
    player2.fighter.renderhp();

    rndmButton.disabled = false;

    document.querySelector('.winnerBar').classList.toggle('show');

    document.querySelector('.control').removeChild(document.querySelectorAll('.button')[1]);

    chatLog('---------------------------- New round! ----------------------------');
}

function randomHP () {
    return Math.floor(Math.random() * 20) + 1;
}

function changeHP(value) {
    value = randomHP();

    this.hp -= value;

    if (this.hp > 0) {
        this.renderhp();
    }
    else {
        this.hp = 0;
        this.renderhp();
    }
}

function renderHP() {
    elHP.call(this).style.width = `${this.hp}%`;
}

function elHP() {
    return document.querySelector(`.${this.player} .life`);
}

function chatLog(message) {
    const chat = document.querySelector('.chat');
    const p = makeElement('p', 'class', 'chatMsg');

    if (message) {
        p.innerHTML = message;
        chat.insertBefore(p, chat.children[0]);
    }
    else {
        p.innerHTML = `${this.name} HP left: ${this.hp}`;
        chat.insertBefore(p, chat.children[0]);
    }
}

class Fighter {
    constructor(player, name, hp, img, weapon) {
        this.player = player;
        this.name = name;
        this.hp = hp;
        this.img = img;
        this.weapon = weapon;
    }

    attack() {
        let string = `${this.name} Fight...`;
        console.log(string);
    }
}

class CreatePlayer {
    constructor(fighter) {
        this.fighter = fighter;
    }

    buildDOM() {
        let playerDiv = makeElement('div', 'class', this.fighter.player);
        let progressBarDiv = makeElement('div', 'class', 'progressbar');
        let lifeDiv = makeElement('div', 'class', 'life');
        let nameDiv = makeElement('div', 'class', 'name');
        let charDiv = makeElement('div', 'class', 'character');
        let imgElement = makeElement('img', 'src', this.fighter.img);

        nameDiv.innerHTML = this.fighter.name;
        lifeDiv.style.width = `${this.fighter.hp}%`;

        progressBarDiv.appendChild(lifeDiv);
        progressBarDiv.appendChild(nameDiv);
        charDiv.appendChild(imgElement);
        playerDiv.appendChild(progressBarDiv);
        playerDiv.appendChild(charDiv);

        return playerDiv;
    }
}