const { Player } = require('./player');

describe('Player Class Tests', () => {
    let player;
    let computer;

    beforeEach(() => {
        player = new Player('player', false);
        computer = new Player('computer', true);
    });

    it('Test makeMove', () => {
        expect(player.makeMove(computer,0,0)).toBe(false)
    })

    it('Test computerMove', () => {
        expect(computer.computerMove(player)).toBe(false);
    })
})