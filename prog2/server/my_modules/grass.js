var LivingCreature = require("./livingCreature")
const { random } = require("./helpers");

module.exports = class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        var newCells = this.chooseCell(0);
        var newCell = newCells[random(newCells)];

        if (this.multiply >= 4 && newCell != undefined) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
        else {
            var newCells = this.chooseCell(6);
            var newCell = newCells[random(newCells)];

            if (this.multiply >= 4 && newCell != undefined) {                
                var newGrass = new Grass(newCell[0], newCell[1], this.index);
                grassArr.push(newGrass);
                matrix[newCell[1]][newCell[0]] = 1;
                this.multiply = 2;
            }
        }
    }

}