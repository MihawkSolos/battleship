const { Player } = require('./player');
const { Gameboard } = require('./gameboard');
const { Ship } = require('./ship');

const player = new Player('Player', false);
const computer = new Player('Computer', true);

let turn = 0; // 0 = computer, 1 = player, for random do Math.round(Math.random());

// create player grids
export function createGrid(className) {
    const contentDiv = document.querySelector('.content');

    // Check if the grid already exists
    let grid = contentDiv.querySelector(`.${className}`);
    if (!grid) {
        grid = document.createElement('div');
        grid.classList.add(className);

        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                const div = document.createElement('div');
                div.classList.add(`cell-${x}-${y}`, 'board');
                grid.appendChild(div);
            }
        }
        contentDiv.appendChild(grid);
    }

    return grid;
}

export function updateGrid(grid, gridElement){

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
                    alert('Player Wins');
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
                    alert('Computer Wins');
                };
            }
        })
    })
}


// play game btn listener 
export function playGameBtn(){
    const playBtn = document.querySelector('.playGame');
    playBtn.addEventListener('click', () => {

        // Computer ships
        const computerShip1 = new Ship(5);
        const computerShip2 = new Ship(4);
        const computerShip3 = new Ship(3);
        const computerShip4 = new Ship(3);
        const computerShip5 = new Ship(2);

        computer.gameboard.placeShip(computerShip1, 0, 0, 'horizontal');
        computer.gameboard.placeShip(computerShip2, 0, 2, 'horizontal');
        computer.gameboard.placeShip(computerShip3, 0, 4, 'horizontal');
        computer.gameboard.placeShip(computerShip4, 0, 6, 'horizontal');
        computer.gameboard.placeShip(computerShip5, 0, 8, 'horizontal');

        // create computer grid and display ships
        const computerBoard = createGrid('computerBoard');
        showShips(computer.gameboard.grid, computerBoard);

        const computerBoardDiv = document.querySelector('.computerBoard');
        createListener(computerBoardDiv);

        // Player ships
        const playerShip1 = new Ship(5);
        const playerShip2 = new Ship(4);
        const playerShip3 = new Ship(3);
        const playerShip4 = new Ship(3);
        const playerShip5 = new Ship(2);

        player.gameboard.placeShip(playerShip1, 1, 0, 'horizontal');
        player.gameboard.placeShip(playerShip2, 0, 2, 'horizontal');
        player.gameboard.placeShip(playerShip3, 5, 2, 'horizontal');
        player.gameboard.placeShip(playerShip4, 2, 3, 'horizontal');
        player.gameboard.placeShip(playerShip5, 5, 4, 'horizontal');


        // create player grid and display ships
        const playerBoard = createGrid('playerBoard');
        showShips(player.gameboard.grid, playerBoard);

        const playerBoardDiv = document.querySelector('.playerBoard'); // dont want player board event listeners
        createListener(playerBoardDiv);
    })
}
