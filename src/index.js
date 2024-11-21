import "./styles.css";
import { createGrid, showShips } from './visual.js';

const { Player } = require('./player');
const { Gameboard } = require('./gameboard');
const { Ship } = require('./ship');

// players
const computer = new Player('Computer', true);
const player = new Player('Player');

// ships
const ship1 = new Ship(5);
const ship2 = new Ship(4);
const ship3 = new Ship(3);
const ship4 = new Ship(3);
const ship5 = new Ship(2);


computer.gameboard.placeShip(ship1, 0, 0, 'horizontal');
computer.gameboard.placeShip(ship2, 1, 1, 'horizontal');
computer.gameboard.placeShip(ship3, 2, 2, 'horizontal');
computer.gameboard.placeShip(ship4, 3, 3, 'horizontal');
computer.gameboard.placeShip(ship5, 4, 4, 'horizontal');

player.gameboard.placeShip(ship1, 1, 0, 'horizontal');
player.gameboard.placeShip(ship2, 0, 2, 'horizontal');
player.gameboard.placeShip(ship3, 4, 2, 'horizontal');
player.gameboard.placeShip(ship4, 2, 3, 'horizontal');
player.gameboard.placeShip(ship5, 5, 4, 'horizontal');

// create computer grid and display ships
createGrid('computerBoard');
//showShips(computer.gameboard.grid, ship1);

// create player grid and display ships
//createGrid('playerBoard');
