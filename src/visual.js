const { Ship } = require('./ship');

export function createGrid(className){
    const contentDiv = document.querySelector('.content');
    const grid = document.createElement('div');
    grid.classList.add(className);

    for(let x = 0; x < 10; x++){
        for(let y = 0; y < 10; y++){
            const div = document.createElement('div');
            div.classList.add(`cell-${x}-${y}`, 'board');
            grid.appendChild(div);
        }
    }
    contentDiv.appendChild(grid);
}

export function showShips(grid){
    Object.entries(grid).forEach(([key,value]) => {
        if(value instanceof Ship){
            const className = '.cell-' + key.replace(',', '-');
            const shipDiv = document.querySelector(className);

            if(shipDiv){
                shipDiv.classList.add('shipCell');
            }else {
                console.log('not found');
            }
        }
    });
}


