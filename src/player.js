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

    computerMove(opponent){
        if(this.isComputer){
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);

            return this.makeMove(opponent, x, y);
        }
    }
}

module.exports = { Player };

