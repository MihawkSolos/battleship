const { Ship } = require('./ship');

// create player grids
export function createGrid(className){
    const contentDiv = document.querySelector('.content');
    const grid = document.createElement('div');
    grid.classList.add(className);

    for(let y = 0; y < 10; y++){
        for(let x = 0; x < 10; x++){
            const div = document.createElement('div');
            div.classList.add(`cell-${x}-${y}`, 'board');
            grid.appendChild(div);
        }
    }
    contentDiv.appendChild(grid);
    return grid; // 
} 

// have to refactor to only show hit divs for ship
export function showShips(grid, gridElement) {
    Object.entries(grid).forEach(([key, value]) => {
        if (value instanceof Ship) {
            const [x, y] = key.split(',').map(Number);
            const cell = gridElement.querySelector(`.cell-${x}-${y}`);
            
            if (cell) {
                cell.classList.add('shipCell');
            } else {
                console.log('Cell not found:', key);
            }
        }
    });
}



// add event listeners for each div in players board 
// function createListener(div){
//     div.querySelectorAll('.board').forEach(child => {
//         child.addEventListener('click', () => {
//             console.log('hi');
//         })
//     })
// }

