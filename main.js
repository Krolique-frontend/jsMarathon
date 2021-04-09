"use strict";

// alert('fightM...');
// console.log('fight...');

let kungLao = new Fighter('Kung Lao', 100, 'https://static.wikia.nocookie.net/mkwikia/images/1/1b/Kunglao_mk3.gif', ['hat']);
let jax = new Fighter('Jax', 100, 'https://static.wikia.nocookie.net/mkwikia/images/4/4e/JAX.gif', ['left hand', 'right hand']);
let scorpion = new Fighter('Scorpion', 50, 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif', ['kunai chain', 'hellfire']);
let kitana = new Fighter('Kitana', 90, 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif', ['steel fan', 'one more steel fan']);
let liuKang = new Fighter('Liu Kang', 70, 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif', ['left leg', 'right leg']);
let sonya = new Fighter('Sonya', 80, 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif', ['gun', 'some weapon']);
let subZero = new Fighter('Sub-Zero', 80, 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif', ['ice blast', 'ice clone', 'many other ice stuff']);


let player1 = new CreatePlayer('player1', scorpion).buildDOM();
let player2 = new CreatePlayer('player2', subZero).buildDOM();

scorpion.attack();
subZero.attack();