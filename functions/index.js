import {logs} from '../constants/logs.js';
import { player1, player2 } from '../game.js';
import {characters} from "../constants/characters.js";

const HIT = {
    head: 30,
    body: 25,
    foot: 20
};
const ATTACK = ['head', 'body', 'foot'];

const formFight = document.querySelector('.control');
formFight.onsubmit = event => {
    event.preventDefault();

    fight();
};

export function makeElement(tagName, attribute, attrValue) {
    let newElement = document.createElement(tagName);
    let newAttribute = document.createAttribute(attribute);

    newAttribute.value = attrValue;
    newElement.setAttributeNode(newAttribute);

    return newElement;
}

function playerAttack() {
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

    return attack;
}

function enemyAttack() {
    const hit = ATTACK[random(3) - 1];
    const defence = ATTACK[random(3) - 1];

    return {
        value: random(HIT[hit]),
        hit,
        defence
    };
}

async function fight() {
    const player = await playerAttack();

    const f = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify({
            hit: player.hit,
            defence: player.defence
        })
    }).then(res => res.json());

    const enemy = f.player2;

    if (enemy.hit === player.defence && player.hit === enemy.defence) {
        chatLog('defence', player2, player1, 0);
        chatLog('defence', player1, player2, 0);
        chatLog();
    }

    else if (player.hit === enemy.defence && enemy.hit !== player.defence) {
        // crit(enemy);
        player1.changeHP(enemy.value);
        player1.renderHP();

        chatLog('hit', player2, player1, enemy.value);
        chatLog('defence', player1, player2, 0);
        chatLog();
    }

    else if (player.hit !== enemy.defence && enemy.hit === player.defence) {
        // crit(player);
        player2.changeHP(player.value);
        player2.renderHP();

        chatLog('defence', player2, player1, 0);
        chatLog('hit', player1, player2, player.value);
        chatLog();
    }

    else if (player.hit !== enemy.defence && enemy.hit !== player.defence) {
        // crit(player);
        // crit(enemy);

        player1.changeHP(enemy.value);
        player2.changeHP(player.value);

        player1.renderHP();
        player2.renderHP();

        chatLog('hit', player1, player2, player.value);
        chatLog('hit', player2, player1, enemy.value);
        chatLog();
    }

    if (player2.hp === 0 || player1.hp === 0) {
        document.querySelector('.button').disabled = true;

        player1.hp === 0
            ? chatLog('end', player2.name, player1.name)
            : chatLog('end', player1.name, player2.name);

        let winner;
        if (player1.hp === 0) winner = player2;
        else if (player2.hp <= 0) winner = player1;
        else if (player1.hp <= 0 && player2.hp <= 0) chatLog('draw');

        chatLog();

        document.querySelector('.winnerBar').classList.toggle('show');
        winner ? document.querySelector('.winnerBar').innerHTML = `${winner.name} wins` : null;

        document.querySelector('.control').appendChild(createReloadButton());
    }
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

    player1.renderHP();
    player2.renderHP();

    document.querySelector('.winnerBar').classList.toggle('show');

    document.querySelector('.control').removeChild(document.querySelector('.resButton'));
    document.querySelector('.button').disabled = false;

    chatLog('start', player1, player2);
    chatLog();
}

export function random(num) {
    return Math.floor(Math.random() * num) + 1;
}

export function chatLog(type, offender, defender, damage) {
    const chat = document.querySelector('.chat');
    const p = makeElement('p', 'class', 'chatMsg');
    const time = new Date().toLocaleTimeString();

    let string;

    switch (type) {
        case 'hit':
            string = logs
                .hit[random(logs.hit.length - 1)]
                .replace('[playerDefence]', defender.name)
                .replace('[playerKick]', offender.name);

            p.innerHTML = `>>${time} ${string} -${damage} [${defender.hp}/100]`;
            break;

        case 'defence':
            string = logs
                .defence[random(logs.defence.length - 1)]
                .replace('[playerDefence]', defender.name)
                .replace('[playerKick]', offender.name);

            p.innerHTML = `>>${time} ${string}`;
            break;

        case 'start':
            string = logs
                .start
                .replace('[player2]', defender.name)
                .replace('[player1]', offender.name)
                .replace('[time]', time);

            p.innerHTML = `>>${time} ${string}`;
            break;

        case 'end':
            string = logs
                .end[random(logs.end.length - 1)]
                .replace('[playerLose]', defender)
                .replace('[playerWins]', offender);

            p.innerHTML = `>>${time} ${string}`;
            break;

        case 'draw':
            p.innerHTML = `>>${time} ${logs.draw}`;
            break;

        default:
            p.innerHTML = '>';
            break;
    }

    chat.insertBefore(p, chat.children[0]);
}

// ?????????? ??????, ?????? ?????? ???????????????? PVP ?? ?????? ?????????? ???? ??????????. ???? ?????? ???? ??????????
// function crit(obj) {
//     return random(1000) > 950 ? obj.value *= 2 : null;
// }