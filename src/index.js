import "./styles.css";
import { createGrid, showShips } from './visual.js';

const { Player } = require('./player');
const { Gameboard } = require('./gameboard');
const { Ship } = require('./ship');

// players
const computer = new Player('Computer', true);
const player = new Player('Player', false);

// Computer ships
const computerShip1 = new Ship(5);
const computerShip2 = new Ship(4);
const computerShip3 = new Ship(3);
const computerShip4 = new Ship(3);
const computerShip5 = new Ship(2);

// Player ships
const playerShip1 = new Ship(5);
const playerShip2 = new Ship(4);
const playerShip3 = new Ship(3);
const playerShip4 = new Ship(3);
const playerShip5 = new Ship(2);



computer.gameboard.placeShip(computerShip1, 0, 0, 'horizontal');
computer.gameboard.placeShip(computerShip2, 0, 2, 'horizontal');
computer.gameboard.placeShip(computerShip3, 0, 4, 'horizontal');
computer.gameboard.placeShip(computerShip4, 0, 6, 'horizontal');
computer.gameboard.placeShip(computerShip5, 0, 8, 'horizontal');

// create computer grid and display ships
const computerBoard = createGrid('computerBoard');
showShips(computer.gameboard.grid, computerBoard);


player.gameboard.placeShip(playerShip1, 1, 0, 'horizontal');
player.gameboard.placeShip(playerShip2, 0, 2, 'horizontal');
player.gameboard.placeShip(playerShip3, 5, 2, 'horizontal');
player.gameboard.placeShip(playerShip4, 2, 3, 'horizontal');
player.gameboard.placeShip(playerShip5, 5, 4, 'horizontal');


// create player grid and display ships
const playerBoard = createGrid('playerBoard');
showShips(player.gameboard.grid, playerBoard);
