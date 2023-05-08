// class GrassEater {
//     constructor(x, y, index) {
//         this.x = x;
//         this.y = y;
//         this.enjergy = 8;
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

//     die() {
//         console.log("merav");

//         matrix[this.y][this.x] = 0
//         for (var i in grassEaterArr) {
//             if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
//                 grassEaterArr.splice(i, 1);
//                 break;
//             }
//         }
//     }

//     eat() {

//         let foods = this.chooseCell(1)
//         let food = random(foods)
//         if (food) {
//             this.energy++
//             matrix[this.y][this.x] = 0
//             let newX = food[0]
//             let newY = food[1]
//             matrix[food[1]][food[0]] = 2
//             this.x = newX
//             this.y = newY
//             for (var i in grassArr) {
//                 if (newX == grassArr[i].x && newY == grassArr[i].y) {
//                     grassArr.splice(i, 1);
//                     break;
//                 }
//             }
//             if (this.energy >= 12) {
//                 this.mul()
//             }
//         }
//         else {
//             this.move()
//         }
//     }

//     move() {

//         this.energy--;
//         var newCell = random(this.chooseCell(0));

//         if (newCell) {
//             matrix[this.y][this.x] = 0;
//             matrix[newCell[1]][newCell[0]] = 2;
//             this.x = newCell[0];
//             this.y = newCell[1];
//         }
//         if (this.energy <= 0) {
//             this.die()
//         }
//     }

//     mul() {
//         var newCell = random(this.chooseCell(0));
//         if (newCell) {
//             var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
//             grassEaterArr.push(newGrassEater);
//             matrix[newCell[1]][newCell[0]] = 2;
//             this.energy = 8
//         }
//     }
// }

class GrassEater extends LivingCreature {

    constructor(x, y, index) {

        super(x, y, index);
        this.energy = 8;

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

    chooseCell(character) {

        this.getNewCoordinates();

        return super.chooseCell(character);

    }

    die() {
        console.log("merav");

        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

    eat() {

        let foods = this.chooseCell(1)
        let food = random(foods)
        if (food) {
            this.energy++
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 2
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 12) {
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
            matrix[newCell[1]][newCell[0]] = 2;
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
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8
        }
    }


}