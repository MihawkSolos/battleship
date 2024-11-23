const { Player } = require('./player');
const { Gameboard } = require('./gameboard');
const { Ship } = require('./ship');

const player = new Player('Player', false);
const computer = new Player('Computer', true);

let turn = 0; // 0 = computer, 1 = player, for random do Math.round(Math.random());

// create player grids
export function createGrid(className) {
    const contentDiv = document.querySelector('.content');

    // Remove any existing grid with the same className
    let existingGrid = contentDiv.querySelector(`.${className}`);
    if (existingGrid) existingGrid.remove();

    // Create a new grid
    const grid = document.createElement('div');
    grid.classList.add(className);

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const div = document.createElement('div');
            div.classList.add(`cell-${x}-${y}`, 'board');
            grid.appendChild(div);
        }
    }

    contentDiv.appendChild(grid);
    return grid;
}


// have to refactor to only show hit divs for ship
export function showShips(grid, gridElement) {
    Object.entries(grid).forEach(([key, value]) => {

        const [x, y] = key.split(',').map(Number);
        const cell = gridElement.querySelector(`.cell-${x}-${y}`);

        if (value instanceof Ship) {
            if (cell) {
                cell.classList.add('shipCell');
            } else {
                console.log('Cell not found:', key);
            }
        } 
        else if (value === 'hit'){
            if (cell) {
                cell.classList.add('hitCell');
            } else {
                console.log('Cell not found:', key);
            }
        }
        else if (value === 'miss'){
            if (cell) {
                cell.classList.add('missCell');
            } else {
                console.log('Cell not found:', key);
            }
        }
    });
}


// add event listeners for each div in players board 
// will call the functions to hit etc..
let clickHandler = null;
export function createListener(div){
    div.querySelectorAll('.board').forEach(child => {
        child.addEventListener('click', (event) => {
            const cell = event.target.className
            .replace('cell-', '')
            .replace(' board', '')
            .replace(' shipCell', '')
            .replace(' hitCell', '')
            .replace(' missCell', '')
            .replace('-', ',');
            const [x,y] = cell.split(',').map(Number);

            if (div.className === 'computerBoard' && turn === 1){ // players turn
                const isHit = player.makeMove(computer, x, y);
                if(isHit){
                    event.target.classList.remove('shipCell'); // since ship was hit want to move .shipCell 
                    event.target.classList.add('hitCell'); // add .hitCell to show ship was hit
                }
                else {
                    event.target.classList.add('missCell');
                }
                
                showShips(computer.gameboard.grid, div);
                turn--;
                if(computer.gameboard.gameLost()){
                    const message = document.querySelector('.message');
                    message.textContent = 'Player Wins!!!';
                    //alert('Player Wins');
                    endGame();
                };
            }
            else if (div.className === 'playerBoard' && turn === 0){ // computer turn 
                const {isHit, x, y} = computer.computerMove(player);
                const cell = div.querySelector(`.cell-${x}-${y}`);

                if(isHit){
                    cell.classList.remove('shipCell'); // since ship was hit want to move .shipCell 
                    cell.classList.add('hitCell'); // add .hitCell to show ship was hit
                }
                else {
                    cell.classList.add('missCell');
                }
                showShips(player.gameboard.grid, div);
                turn++;
                if(player.gameboard.gameLost()){
                    const message = document.querySelector('.message');
                    message.textContent = 'Computer Wins!!!';
                    //alert('Computer Wins');
                    endGame();
                };
            }
        })
        // Attach click handler for each board cell
        child.addEventListener('click', clickHandler);
    })
}

function randomizeShips(player, ship) {
    let placed = false; // Flag to track successful placement

    while (!placed) {
        // Generate random coordinates and direction
        const x = Math.floor(Math.random() * 10); // Random integer 0-9
        const y = Math.floor(Math.random() * 10); // Random integer 0-9
        let direction = Math.round(Math.random()) === 0 ? 'horizontal' : 'vertical';

        try {
            // Try placing the ship
            player.gameboard.placeShip(ship, x, y, direction);
            placed = true; // If successful, set the flag to true
        } catch (error) {
            // Placement failed, retry with new random values
            console.log(`Failed to place ship at (${x}, ${y}) with direction ${direction}. Retrying...`);
        }
    }
}


function playGameHandler(){
    //console.log(player.gameboard.ships);
    //console.log(player.gameboard.grid);

    //console.log(computer.gameboard.ships);
    //console.log(computer.gameboard.grid);

    // Computer ships
    const computerShips = [
        new Ship(5),
        new Ship(4),
        new Ship(3),
        new Ship(3),
        new Ship(2),
    ];

    computerShips.forEach(ship => randomizeShips(computer, ship));

    // create computer grid and display ships
    const computerBoard = createGrid('computerBoard');
    showShips(computer.gameboard.grid, computerBoard);

    const computerBoardDiv = document.querySelector('.computerBoard');
    createListener(computerBoardDiv);

    // Player ships
    const playerShips = [
        new Ship(5),
        new Ship(4),
        new Ship(3),
        new Ship(3),
        new Ship(2),
    ];

    playerShips.forEach(ship => randomizeShips(player, ship));

    // create player grid and display ships
    const playerBoard = createGrid('playerBoard');
    showShips(player.gameboard.grid, playerBoard);

    const playerBoardDiv = document.querySelector('.playerBoard'); // dont want player board event listeners
    createListener(playerBoardDiv);
}

// play game btn listener 
export function playGameBtn(){
    const playBtn = document.querySelector('.playGame');
    playBtn.addEventListener('click', playGameHandler)
}


// remove game when game ends
export function endGame(){
    const computerBoardDiv = document.querySelector('.computerBoard');
    const playerBoardDiv = document.querySelector('.playerBoard');
    const playBtn = document.querySelector('.playGame');

    playBtn.removeEventListener('click', playGameHandler);

    computerBoardDiv.querySelectorAll('.board').forEach(child => {
        const clickHandler = child.dataset.clickHandler;
        child.removeEventListener('click', clickHandler); // Remove the listener
        delete child.dataset.clickHandler; // Clean up
    });

    playerBoardDiv.querySelectorAll('.board').forEach(child => {
        const clickHandler = child.dataset.clickHandler;
        child.removeEventListener('click', clickHandler); // Remove the listener
        delete child.dataset.clickHandler; // Clean up
    });;

    // Completely remove the grids
    if (computerBoardDiv) computerBoardDiv.remove();
    if (playerBoardDiv) playerBoardDiv.remove();

    computer.gameboard.clearGrid();
    player.gameboard.clearGrid();

    player.gameboard.initializeGrid();
    computer.gameboard.initializeGrid();

    createGrid('playerBoard');
    createGrid('computerBoard');

    // Show the newly initialized grids
    showShips(player.gameboard.grid, playerBoardDiv);
    showShips(computer.gameboard.grid, computerBoardDiv);

    //console.log(player.gameboard.ships);

    playGameBtn();
}
