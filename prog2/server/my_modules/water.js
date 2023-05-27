var LivingCreature = require("./livingCreature")

module.exports = class Water extends LivingCreature {
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
    }
}