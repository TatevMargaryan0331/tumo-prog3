var LivingCreature = require("./livingCreature")

module.exports = class Water extends LivingCreature {
    mul() {
        var newCells = this.chooseCell(0);
        var newCell = newCells[random(newCells)];

        if ( newCell != undefined) {
            var newGrass = new Water(newCell[0], newCell[1], this.index);
            waterArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 6;
        }
    }
}