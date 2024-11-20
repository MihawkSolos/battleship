const { Ship } = require('./ship');

it('Check isSunk function', () => {
    const ship1 = new Ship(5);
    ship1.hit();
    ship1.hit();
    ship1.hit();
    ship1.hit();
    ship1.hit();
    expect(ship1.isSunk()).toBe(true);
})

it('Check hit function when hit', () => {
    const ship1 = new Ship(5);
    ship1.hit();
    expect(ship1.hits).toEqual(1);
})

it('Check hit function when only initialized', () => {
    const ship1 = new Ship(5);
    expect(ship1.hits).toEqual(0);
})

