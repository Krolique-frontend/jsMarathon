'use strict';
import {chatLog, random} from "./functions";
import Fighter from './Fighter/Fighter.js';

// HardCode
export let player1, player2;

export default class Game {
    getPlayers = async () => {
        return fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
    }

    start = async () => {
        const players = await this.getPlayers();

        const p1 = players[random(players.length - 1)];
        const p2 = players[random(players.length - 1)];

        player1 = new Fighter(p1, 'player1');
        player2 = new Fighter(p2, 'player2');

        player1.name === player2.name ? player2.name += '-2' : null;

        player1.createPlayer();
        player2.createPlayer();

        chatLog('start', player1, player2);
        chatLog();
    }
}