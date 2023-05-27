var LivingCreature = require("./livingCreature")
const {random} = require("./helpers");

module.exports = class OmnivoreEater extends LivingCreature {

    constructor(x, y, index) {

        super(x, y, index);
        this.energy = 8;

    }

    chooseCell(character) {

        this.getNewCoordinates();

        return super.chooseCell(character);

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    die() {
        console.log("merav");

        matrix[this.y][this.x] = 0
        for (var i in OmnivoreEaterArr) {
            if (this.x == OmnivoreEaterArr[i].x && this.y == OmnivoreEaterArr[i].y) {
                OmnivoreEaterArr.splice(i, 1);
                break;
            }
        }
    }

    eat() {

        let foods = this.chooseCell(3)
        let food = foods[random(foods)]
        if (food != undefined) {
            this.energy++
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 4
            this.x = newX
            this.y = newY
            for (var i in OmnivoreArr) {
                if (newX == OmnivoreArr[i].x && newY == OmnivoreArr[i].y) {
                    OmnivoreArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 10) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }

    move() {

        this.energy--;
        var newCells = this.chooseCell(0);
        var newCell= newCells[random(newCells)];

        if (newCell != undefined) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 4;
            this.x = newCell[0];
            this.y = newCell[1];
        }
        if (this.energy <= 0) {
            this.die()
        }
    }

    mul() {
        var newCells = this.chooseCell(0);
        var newCell= newCells[random(newCells)];
        if (newCell != undefined) {
            var newOmnivoreEater = new OmnivoreEater(newCell[0], newCell[1], this.index);
            OmnivoreEaterArr.push(newOmnivoreEater);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 8
        }
    }


}

