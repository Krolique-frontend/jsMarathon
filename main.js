"use strict";

// alert('fightM...');
// console.log('fight...');

const arenas = document.querySelector('.arenas');
const rndmButton = document.querySelector('.button');

const kungLao = new Fighter('player1', 'Kung Lao', 90, 'https://static.wikia.nocookie.net/mkwikia/images/1/1b/Kunglao_mk3.gif', ['hat']);
const jax = new Fighter('player2', 'Jax', 85, 'https://static.wikia.nocookie.net/mkwikia/images/4/4e/JAX.gif', ['left hand', 'right hand']);
const scorpion = new Fighter('player1', 'Scorpion', 50, 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif', ['kunai chain', 'hellfire']);
const kitana = new Fighter('player1', 'Kitana', 90, 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif', ['steel fan', 'one more steel fan']);
const liuKang = new Fighter('player2', 'Liu Kang', 70, 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif', ['left leg', 'right leg']);
const sonya = new Fighter('player1', 'Sonya', 80, 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif', ['gun', 'some weapon']);
const subZero = new Fighter('player2', 'Sub-Zero', 80, 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif', ['ice blast', 'ice clone', 'many other ice stuff']);

const player1 = new CreatePlayer(kungLao);
const player2 = new CreatePlayer(jax);

arenas.appendChild(player1.buildDOM());
arenas.appendChild(player2.buildDOM());

const randomHP = () => Math.floor(Math.random() * 20) + 1;

function changeHp(value) {
    value = randomHP();

    const enemy = player2.fighter;
    enemy.hp -= value;

    if (enemy.hp > 0) {
        renderHP.call(enemy);
        console.log(`${enemy.name} HP left:`, enemy.hp);
    }
    else {
        enemy.hp = 0;
        renderHP.call(enemy);
        document.querySelector('.winnerBar').classList.toggle('show');
        document.querySelector('.winnerBar').innerHTML = `${player1.fighter.name} wins`;
        rndmButton.disabled = true;
    }
}

function renderHP() {
    elHP.call(this).style.width = `${this.hp}%`;
}

function elHP() {
    return document.querySelector(`.${this.player} .life`);
}

rndmButton.onclick = changeHp;