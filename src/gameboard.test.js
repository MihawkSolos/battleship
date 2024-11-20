const { Ship } = require('./ship');
const { Gameboard } = require('./gameboard');

describe('Gameboard Class Tests', () => {
    let board;

    beforeEach(() => {
        board = new Gameboard();
        board.initializeGrid();
    });

    it('Should place a ship horizontally', () => {
        const ship = new Ship(3);
        board.placeShip(ship, 0, 0, 'horizontal');
        expect(board.grid['0,0']).toBe(ship);
        expect(board.grid['1,0']).toBe(ship);
        expect(board.grid['2,0']).toBe(ship);
    });

    it('Should place a ship vertically', () => {
        const ship = new Ship(3);
        board.placeShip(ship, 0, 0, 'vertical');
        expect(board.grid['0,0']).toBe(ship);
        expect(board.grid['0,1']).toBe(ship);
        expect(board.grid['0,2']).toBe(ship);
    });

    it('Should handle missed attack', () => {
        board.receiveAttack(5, 5);
        expect(board.grid['5,5']).toBe('miss');
        expect(board.showMissedAttacks()).toContain('5,5');
    });

    it('Should handle a hit attack', () => {
        const ship = new Ship(2);
        board.placeShip(ship, 0, 0, 'horizontal');
        board.receiveAttack(0, 0);
        expect(ship.hits).toBe(1);
        expect(board.grid['0,0']).toBe('hit');
    });

    it('Should report game lost when all ships are sunk', () => {
        const ship = new Ship(1);
        board.placeShip(ship, 0, 0, 'horizontal');
        board.receiveAttack(0, 0);
        expect(board.gameLost()).toBe(true);
    });
});
