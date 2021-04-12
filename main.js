"use strict";

// alert('fightM...');
// console.log('fight...');

const arenas = document.querySelector('.arenas');
const rndmButton = document.querySelector('.button');

const kungLao = new Fighter('player1', 'Kung Lao', 100, 'https://static.wikia.nocookie.net/mkwikia/images/1/1b/Kunglao_mk3.gif', ['hat']);
const jax = new Fighter('player2', 'Jax', 100, 'https://static.wikia.nocookie.net/mkwikia/images/4/4e/JAX.gif', ['left hand', 'right hand']);
const scorpion = new Fighter('player1', 'Scorpion', 100, 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif', ['kunai chain', 'hellfire']);
const kitana = new Fighter('player1', 'Kitana', 100, 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif', ['steel fan', 'one more steel fan']);
const liuKang = new Fighter('player2', 'Liu Kang', 100, 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif', ['left leg', 'right leg']);
const sonya = new Fighter('player1', 'Sonya', 100, 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif', ['gun', 'some weapon']);
const subZero = new Fighter('player2', 'Sub-Zero', 100, 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif', ['ice blast', 'ice clone', 'many other ice stuff']);

const player1 = new CreatePlayer(kungLao);
const player2 = new CreatePlayer(jax);

player1.fighter.elhp = elHP;
player2.fighter.elhp = elHP;
player1.fighter.renderhp = renderHP;
player2.fighter.renderhp = renderHP;
player1.fighter.changehp = changeHP;
player2.fighter.changehp = changeHP;

arenas.appendChild(player1.buildDOM());
arenas.appendChild(player2.buildDOM());



// Пока оставил это всё для интриги, уберу потом =)
rndmButton.onclick = function () {
    const punch = Math.random() > 0.5 ? 1 : 0;

    if (punch === 1) {
        player1.fighter.changehp();
        chatLog.call(player1.fighter);
    }
    else {
        player2.fighter.changehp();
        chatLog.call(player2.fighter);
    }

    if (player2.fighter.hp === 0 || player1.fighter.hp === 0) {
        const winner = player1.fighter.hp === 0 ? player2.fighter : player1.fighter;

        document.querySelector('.winnerBar').classList.toggle('show');
        document.querySelector('.winnerBar').innerHTML = `${winner.name} wins`;

        rndmButton.disabled = true;

        document.querySelector('.control').appendChild(createReloadButton());
        document.querySelectorAll('.button')[1].onclick = restart;
    }
};
