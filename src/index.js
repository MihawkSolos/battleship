import "./styles.css";
import { createGrid, showShips, playGameBtn, createListener } from './visual.js';

const { Player } = require('./player');
const { Gameboard } = require('./gameboard');
const { Ship } = require('./ship');

playGameBtn();
