var LivingCreature = require("./livingCreature")

module.exports = class Omnivore extends LivingCreature {

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
        for (var i in OmnivoreArr) {
            if (this.x == OmnivoreArr[i].x && this.y == OmnivoreArr[i].y) {
                OmnivoreArr.splice(i, 1);
                break;
            }
        }
    }

    eat() {

        let foods = this.chooseCell(2)
        let food = random(foods)
        if (food) {
            this.energy++
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 3
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
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
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 3;
            this.x = newCell[0];
            this.y = newCell[1];
        }
        if (this.energy <= 0) {
            this.die()
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newOmnivore = new Omnivore(newCell[0], newCell[1], this.index);
            OmnivoreArr.push(newOmnivore);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 8
        }
    }


}

