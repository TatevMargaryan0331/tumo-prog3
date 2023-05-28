var LivingCreature = require("./livingCreature")
const { random } = require("./helpers");

module.exports = class Grass extends LivingCreature {
    mul() {
        if (weather !== 4) {
            this.multiply++;
            var newCells = this.chooseCell(0);
            var newCell = newCells[random(newCells)];

            if (this.multiply >= 4 && newCell != undefined) {
                var newGrass = new Grass(newCell[0], newCell[1], this.index);
                grassArr.push(newGrass);
                matrix[newCell[1]][newCell[0]] = 1;
                this.multiply = 0;
            } else {
                var newCells = this.chooseCell(6);
                var newCell = newCells[random(newCells)];

                if (this.multiply >= 4 && newCell != undefined) {
                    var newGrass = new Grass(newCell[0], newCell[1], this.index);
                    grassArr.push(newGrass);
                    let newX = newCell[0]
                    let newY = newCell[1]
                    matrix[newCell[1]][newCell[0]] = 1;
                    for (var i in waterArr) {
                        if (newX == waterArr[i].x && newY == waterArr[i].y) {
                            waterArr.splice(i, 1);
                            break;
                        }
                    }
                    this.multiply = 2;
                }
            }
        }
    }

}