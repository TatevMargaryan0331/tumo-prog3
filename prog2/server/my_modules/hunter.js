// class Hunter {
//     constructor(x, y, index) {
//         this.x = x;
//         this.y = y;
//         this.multiply = 6;
//         this.index = index;
//         this.directions = [[this.x - 1, this.y - 1],
//         [this.x, this.y - 1],
//         [this.x + 1, this.y - 1],
//         [this.x - 1, this.y],
//         [this.x + 1, this.y],
//         [this.x - 1, this.y + 1],
//         [this.x, this.y + 1],
//         [this.x + 1, this.y + 1]];
//     }

//     chooseCell(character) {
//         this.getNewCoordinates();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }

//             }
//         }
//         return found;

//     }

//     getNewCoordinates() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }

//     chooseFood() {
//         var found = [];
//         for (let i = 0; i < matrix.length; i++) {
//             for (let j = 0; j < matrix[i].length; j++) {
//                 var index = matrix[i][j];
//                 if (index == 4) {
//                     found.push([j, i, matrix[i][j]]);
//                 }
//                 else if (index == 3) {
//                     found.push([j, i, matrix[i][j]]);
//                 }
//             }
//         }
//         return found;

//     }

//     die() {
//         console.log("merav");

//         matrix[this.y][this.x] = 0
//         for (var i in HunterArr) {
//             if (this.x == HunterArr[i].x && this.y == HunterArr[i].y) {
//                 HunterArr.splice(i, 1);
//                 break;
//             }
//         }
//     }

//     kill() {

//         let foods = this.chooseFood()
//         let food = random(foods)
//         if (food) {
//             this.multiply++
//             matrix[this.y][this.x] = 0
//             let newX = food[0]
//             let newY = food[1]
//             let foodIndex = food[2];
//             matrix[food[1]][food[0]] = 5
//             console.log(food);
//             this.x = newX
//             this.y = newY

//             if (foodIndex = 4) {
//                 for (var i in OmnivoreEaterArr) {
//                     if (newX == OmnivoreEaterArr[i].x && newY == OmnivoreEaterArr[i].y) {
//                         OmnivoreEaterArr.splice(i, 1);
//                         break;
//                     }
//                 }
//             } else {
//                 for (var i in OmnivoreArr) {
//                     if (newX == OmnivoreArr[i].x && newY == OmnivoreArr[i].y) {
//                         OmnivoreArr.splice(i, 1);
//                         break;
//                     }
//                 }
//             }

//             if (this.multiply >= 12) {
//                 this.mul()
//             }
//         }
//         else {
//             this.move()
//         }
//     }

//     move() {

//         this.multiply--;
//         var newCell = random(this.chooseCell(0));

//         if (newCell) {
//             matrix[this.y][this.x] = 0;
//             matrix[newCell[1]][newCell[0]] = 5;
//             this.x = newCell[0];
//             this.y = newCell[1];
//         }
//         else {
//             var newCell = random(this.chooseCell(1));

//             if (newCell) {
//                 this.multiply++
//                 matrix[this.y][this.x] = 1
//                 let newX = newCell[0]
//                 let newY = newCell[1]
//                 matrix[newCell[1]][newCell[0]] = 5
//                 this.x = newX
//                 this.y = newY
//                 for (var i in grassArr) {
//                     if (newX == grassArr[i].x && newY == grassArr[i].y) {
//                         grassArr.splice(i, 1);
//                         break;
//                     }
//                 }
//             }
//         }
//         if (this.multiply <= 0) {
//             this.die()
//         }
//     }

//     mul() {
//         var newCell = random(this.chooseCell(0));
//         if (newCell) {
//             var newHunter = new Hunter(newCell[0], newCell[1], this.index);
//             HunterArr.push(newHunter);
//             matrix[newCell[1]][newCell[0]] = 5;
//             this.multiply = 6
//         }
//     }


// }
var LivingCreature = require("./livingCreature")
module.exports = class Hunter extends LivingCreature {

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

    chooseFood() {
        var found = [];
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                var index = matrix[i][j];
                if (index == 4) {
                    found.push([j, i, matrix[i][j]]);
                }
                else if (index == 3) {
                    found.push([j, i, matrix[i][j]]);
                }
            }
        }
        return found;

    }

    die() {
        console.log("merav");

        matrix[this.y][this.x] = 0
        for (var i in HunterArr) {
            if (this.x == HunterArr[i].x && this.y == HunterArr[i].y) {
                HunterArr.splice(i, 1);
                break;
            }
        }
    }

    kill() {

        let foods = this.chooseFood()
        let food = random(foods)
        if (food) {
            this.multiply++
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            let foodIndex = food[2];
            matrix[food[1]][food[0]] = 5
            console.log(food);
            this.x = newX
            this.y = newY

            if (foodIndex = 4) {
                for (var i in OmnivoreEaterArr) {
                    if (newX == OmnivoreEaterArr[i].x && newY == OmnivoreEaterArr[i].y) {
                        OmnivoreEaterArr.splice(i, 1);
                        break;
                    }
                }
            } else {
                for (var i in OmnivoreArr) {
                    if (newX == OmnivoreArr[i].x && newY == OmnivoreArr[i].y) {
                        OmnivoreArr.splice(i, 1);
                        break;
                    }
                }
            }

            if (this.multiply >= 12) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }

    move() {

        this.multiply--;
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 5;
            this.x = newCell[0];
            this.y = newCell[1];
        }
        else {
            var newCell = random(this.chooseCell(1));

            if (newCell) {
                this.multiply++
                matrix[this.y][this.x] = 1
                let newX = newCell[0]
                let newY = newCell[1]
                matrix[newCell[1]][newCell[0]] = 5
                this.x = newX
                this.y = newY
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
        if (this.multiply <= 0) {
            this.die()
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newHunter = new Hunter(newCell[0], newCell[1], this.index);
            HunterArr.push(newHunter);
            matrix[newCell[1]][newCell[0]] = 5;
            this.multiply = 6
        }
    }


}
