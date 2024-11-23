const { Ship } = require('./ship');

class Gameboard{
    constructor(){
        this.grid = {}; // will store coordinates and ther state in an object
        this.missedShots = [];
        this.ships = []; // will track the ships placed on the board 
    }

    initializeGrid(){
        for(let y = 0; y < 10; y++){
            for(let x = 0; x < 10; x++){
                this.grid[`${x},${y}`] = null; // sets all possible coordinates to null
            }
        }
    }

    clearGrid(){
        this.grid = {};
        this.ships = [];
    }

    placeShip(ship, startX, startY, direction) {
        const length = ship.length;
        const positions = [];
    
        for (let i = 0; i < length; i++) {
            const x = direction === 'horizontal' ? startX + i : startX;
            const y = direction === 'vertical' ? startY + i : startY;
    
            // Check boundaries
            if (x >= 10 || y >= 10 || this.grid[`${x},${y}`]) {
                throw new Error('Invalid ship placement');
            }
    
            // Save position to place ship after validation
            positions.push({ x, y });
        }
    
        // If all positions are valid, place the ship
        positions.forEach(({ x, y }) => {
            this.grid[`${x},${y}`] = ship; // Assign the ship to the cell
        });
    
        this.ships.push(ship); // Add ship to the list
    }
    

    // Handle an attack at given coordinates
    receiveAttack(x, y) {
        const key = `${x},${y}`;
        const cell = this.grid[key];
        console.log(key);

        if (cell === null) {
            this.missedShots.push(key); // Record missed shot
            this.grid[key] = 'miss'; // Mark the cell as a miss
            return false; // Indicate that the attack was a miss
        } else if (cell instanceof Ship) {
            cell.hit(); // Call the ship's hit method
            this.grid[key] = 'hit'; // Mark the cell as a hit
            return true; // Indicate that the attack was a hit
        } else {
            throw new Error('Cell already attacked');
        }
    }

    showMissedAttacks(){
        return this.missedShots;
    }

    gameLost(){
        return this.ships.every((ship) => ship.isSunk());
    }
}

module.exports = { Gameboard };