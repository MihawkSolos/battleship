const { Ship } = require('./ship');
const { Gameboard } = require('./gameboard');

class Player {
    constructor(name, isComputer = false){
        this.name = name;
        this.isComputer = isComputer;
        this.gameboard = new Gameboard;
        this.gameboard.initializeGrid();
    }

    makeMove(opponent, x, y){
        return opponent.gameboard.receiveAttack(x,y);
    }

    computerMove(opponent) {
        if (this.isComputer) {
            let x, y, isHit;
    
            // Loop until we get a valid move
            do {
                // Generate random coordinates
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
    
                try {
                    // Try to make the move
                    isHit = this.makeMove(opponent, x, y);
                    break; // If no error occurs, exit the loop
                } catch (err) {
                    // If an error occurs, log it and continue to retry
                    if (err.message === 'Cell already attacked') {
                        console.log('Cell already attacked, retrying...');
                        // Retry the move without breaking
                    } else {
                        // If it's a different error, rethrow it
                        throw err;
                    }
                }
            } while (true); // Keep retrying until the move is successful
    
            // Return the result after a successful move
            return { isHit, x, y };
        }
    }
    
}

module.exports = { Player };

