"use strict";
const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20
};
const ATTACK = ['head', 'body', 'foot'];

const p1 = characters.find(char => char.name === 'Sonya');
const p2 = characters.find(char => char.name === 'Jax');

const player1 = new Fighter(p1, 'player1');
const player2 = new Fighter(p2, 'player2');

arenas.appendChild(createPlayer.call(player1));
arenas.appendChild(createPlayer.call(player2));

formFight.onsubmit = event => {
    event.preventDefault();

    fight();
};