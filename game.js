'use strict';
import {characters} from "./characters.js";
import {chatLog, fight, Fighter, createPlayer} from "./models.js";

const arenas = document.querySelector('.arenas');
export const formFight = document.querySelector('.control');

// Le choice
const sel1 = document.getElementById('select1');
const sel2 = document.getElementById('select2');
const choose = document.querySelector('.choose');

characters.forEach(char => {
    const opt = document.createElement('option');
    const opt2 = document.createElement('option');
    opt.innerText = char.name;
    opt2.innerText = char.name;
    sel1.appendChild(opt);
    sel2.appendChild(opt2);
});

export let p1, p2, player1, player2;

sel1.onchange = () => {
    p1 = characters.find(char => char.name === sel1.value);
    player1 = new Fighter(p1, 'player1');
    arenas.appendChild(createPlayer.call(player1));
    sel1.disabled = true;
};

sel2.onchange = () => {
    p2 = characters.find(char => char.name === sel2.value);
    player2 = new Fighter(p2, 'player2');

    player1.name === player2.name ? player2.name += '-2' : null;

    arenas.appendChild(createPlayer.call(player2));
    sel2.disabled = true;
};

applyChoice.onclick = () => {
    if (player1 && player2) {
        chatLog('start', player1, player2);
        chatLog();
        choose.style.display = 'none';
    } else alert('Choose your fighter!');
};

formFight.onsubmit = event => {
    event.preventDefault();

    fight();
};

export class Game {
    start() {

    }
}

// HardCode
// const p1 = characters.find(char => char.name === 'Sonya');
// const p2 = characters.find(char => char.name === 'Jax');

// const player1 = new Fighter(p1, 'player1');
// const player2 = new Fighter(p2, 'player2');

// arenas.appendChild(createPlayer.call(player1));
// arenas.appendChild(createPlayer.call(player2));