"use strict";
const sel1 = document.getElementById('select1');
const sel2 = document.getElementById('select2');
const choose = document.querySelector('.choose');

characters.forEach(char => {
    const opt = document.createElement('option');
    opt.innerText = char.name;
    sel1.appendChild(opt);
});

characters.forEach(char => {
    const opt = document.createElement('option');
    opt.innerText = char.name;
    sel2.appendChild(opt);
});

const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20
};
const ATTACK = ['head', 'body', 'foot'];

let p1, p2, player1, player2;

sel1.onchange = () => {
    p1 = characters.find(char => char.name === sel1.value);
    player1 = new Fighter(p1, 'player1');
    arenas.appendChild(createPlayer.call(player1));
};

sel2.onchange = () => {
    p2 = characters.find(char => char.name === sel2.value);
    player2 = new Fighter(p2, 'player2');
    arenas.appendChild(createPlayer.call(player2));
};

applyChoice.onclick = () => {
    if (player1 && player2) choose.style.display = 'none';
    else alert('Choose your fighter!');
};

// HardCode
// const p1 = characters.find(char => char.name === 'Sonya');
// const p2 = characters.find(char => char.name === 'Jax');

// const player1 = new Fighter(p1, 'player1');
// const player2 = new Fighter(p2, 'player2');

// arenas.appendChild(createPlayer.call(player1));
// arenas.appendChild(createPlayer.call(player2));

formFight.onsubmit = event => {
    event.preventDefault();

    fight();
};