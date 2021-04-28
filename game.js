'use strict';
import {chatLog, randomPlayer} from "./functions";
import Fighter from './Fighter/Fighter.js';

// HardCode
export let player1 = new Fighter(randomPlayer(), 'player1');
export let player2 = new Fighter(randomPlayer(), 'player2');

player1.name === player2.name ? player2.name += '-2' : null;

export default class Game {
    start() {
        player1.createPlayer();
        player2.createPlayer();
        chatLog('start', player1, player2);
        chatLog();
    }
}