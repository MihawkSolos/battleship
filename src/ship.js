class Ship{
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }
    
    hit(){
        if(this.hits < this.length){
            this.hits += 1;
        }
        else {
            this.isSunk();
        }
        return this.hits;
    }

    isSunk(){
        if(this.hits >= this.length){
            this.sunk = true;
        }
        return this.sunk;
    }
}


module.exports = { Ship };