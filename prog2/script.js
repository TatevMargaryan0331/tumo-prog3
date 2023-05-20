var matrix = []
var n = +prompt("nshel matrix-i laynutyuny")
var m = +prompt("nshel matrix-i erkarutyuny")

if (n < 50) {
    n = 0
    alert("matrix-i laynutyuny chpetq e lini 50-ic poqr! nsheq nory");
    n = +prompt("nshel matrix-i laynutyuny")
}
if (m < 50) {
    m = 0
    alert("matrix-i erkarutyuny chpetq e lini 50-ic poqr! nsheq nory");
    m = +prompt("nshel matrix-i erkarutyuny")
}

// var side = 120;
var side = 10;
var grassArr = [];
var grassEaterArr = [];
var OmnivoreArr = [];
var OmnivoreEaterArr = [];
var HunterArr = [];

function kerparner(qanak, kerpar) {
    var a = 0;
    while (a < qanak) {
        var x = Math.floor(random(0, m))
        var y = Math.floor(random(0, n))

        if (matrix[y][x] == 0) {
            matrix[y][x] = kerpar;
        }
        else {
            var x = Math.floor(random(0, m))
            var y = Math.floor(random(0, n))

            matrix[y][x] = kerpar;
        }
        a++;
    }
}


function setup() {


    for (let i = 0; i < n; i++) {
        matrix[i] = []
        for (let j = 0; j < m; j++) {
            matrix[i].push(0)
        }
    }

    kerparner(100, 1);
    kerparner(300, 2);
    kerparner(100, 3);
    kerparner(100, 4);
    kerparner(100, 5);

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y, 1);
                grassArr.push(grass)
            }
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grassEater)
            }
            else if (matrix[y][x] == 3) {
                let omnivore = new Omnivore(x, y, 3);
                OmnivoreArr.push(omnivore)
            }
            else if (matrix[y][x] == 4) {
                let newOmnivoreEater = new OmnivoreEater(x, y, 4);
                OmnivoreEaterArr.push(newOmnivoreEater)
            }
            else if (matrix[y][x] == 5) {
                let hunter = new Hunter(x, y, 4);
                HunterArr.push(hunter)
            }
        }
    }
    // console.log(grassArr);
}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("brown");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }

            rect(x * side, y * side, side, side);

            // fill("blue")
            // text(x + " " + y, x * side + side / 2, y * side + side / 2)
        }
    }   //client

    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }

    for (var i in OmnivoreArr) {
        OmnivoreArr[i].eat();
    }

    for (var i in OmnivoreEaterArr) {
        OmnivoreEaterArr[i].eat();
    }

    for (var i in HunterArr) {
        HunterArr[i].kill();
    }  //server

}
