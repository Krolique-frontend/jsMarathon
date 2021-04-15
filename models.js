const HIT = {
    head: 30,
    body: 25,
    foot: 20
};
const ATTACK = ['head', 'body', 'foot'];

function makeElement(tagName, attribute, attrValue) {
    let newElement = document.createElement(tagName);
    let newAttribute = document.createAttribute(attribute);

    newAttribute.value = attrValue;
    newElement.setAttributeNode(newAttribute);

    return newElement;
}

function createReloadButton() {
    const div = makeElement('div', 'class', 'reloadWrap');
    const button = makeElement('button', 'class', 'button resButton');

    button.innerHTML = 'restart';
    div.appendChild(button);

    button.onclick = event => {
        event.preventDefault();

        restart();
    };

    return button;
}

function restart() {
    player1.hp = 100;
    player2.hp = 100;

    player1.renderHP;
    player2.renderHP;

    document.querySelector('.winnerBar').classList.toggle('show');

    document.querySelector('.control').removeChild(document.querySelector('.resButton'));

    chatLog('---------------------------- New round! ----------------------------');
}

function random(num) {
    return Math.floor(Math.random() * num) + 1;
}

function changeHP(value) {
    this.hp -= value;
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
        p.innerHTML = `${message}`;
        chat.insertBefore(p, chat.children[0]);
    }
}

function createPlayer() {
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

    return playerDiv;
}

function enemyAttack() {
    const hit = ATTACK[random(3)-1];
    const defence = ATTACK[random(3)-1];

    return {
        value: random(HIT[hit]),
        hit,
        defence
    };
}

function fight() {
    const enemy = enemyAttack();
    const attack = {};

    for (let item of formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = random(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    if (enemy.hit === attack.defence) {
        crit(enemy);

        enemy.value = Math.round(enemy.value / 3);
        chatLog(`>> ${player1.name} blocks hit to ${enemy.hit}`);
    }

    if (attack.hit === enemy.defence) {
        crit(attack);

        attack.value = Math.round(attack.value / 3);
        chatLog(`>> ${player2.name} blocks hit to ${attack.hit}`);
    }

    if (player1.hp > 0 && player2.hp > 0) {
        crit(attack);
        crit(enemy);

        player1.changeHP(enemy.value);
        player2.changeHP(attack.value);

        player1.renderHP();
        player2.renderHP();

        chatLog(`>> ${player1.name} hit ${attack.value} to ${attack.hit}`);
        chatLog(`>> ${player2.name} hit ${enemy.value} to ${enemy.hit}`);
        chatLog('>');
    }

    if (player2.hp <= 0 || player1.hp <= 0) {
        player1.hp <= 0 ? player1.hp = 0 : player2.hp = 0;

        player1.renderHP();
        player2.renderHP();

        const winner = player1.hp <= 0 ? player2 : player1;

        document.querySelector('.winnerBar').classList.toggle('show');
        document.querySelector('.winnerBar').innerHTML = `${winner.name} wins`;

        document.querySelector('.control').appendChild(createReloadButton());
    }
}

function crit(obj) {
    return random(1000) > 950 ? obj.value *= 2 : null;
}

class Fighter {
    constructor(char, playerNum) {
        this.player = playerNum;
        this.name = char.name;
        this.hp = char.hp;
        this.img = char.img;
        this.weapon = char.weapon;
        this.changeHP = changeHP;
    }

    attack() {
        let string = `${this.name} Fight...`;
        console.log(string);
    }

    renderHP() {
        renderHP.call(this);
    }
}