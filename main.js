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

function changeHp() {
    let offender, defender;

    if (Math.random() > 0.5) {
        offender = player1.fighter;
        defender = player2.fighter;
    } else {
        offender= player2.fighter;
        defender = player1.fighter;
    }

    const life = document.querySelector(`.${defender.player} .life`);
    const randomHP = Math.floor( 20 - Math.random() * 20 );

    if (randomHP === 0) console.log(`${defender.name} block`);
    else  defender.hp -= randomHP;

    if (defender.hp > 0) {
        life.style.width = `${defender.hp}%`;
        console.log(`${defender.name} HP left:`, defender.hp);
    }
    else {
        life.style.width = `0%`;
        document.querySelector('.winnerBar').classList.toggle('show');
        document.querySelector('.winnerBar').innerHTML = `${offender.name} wins`;
        rndmButton.disabled = true;
    }
}

rndmButton.onclick = changeHp;

// scorpion.attack();
// subZero.attack();