var express = require("express");

var app = express();

app.use(express.static("../client"));

app.get("/", function (req, res) {

    res.redirect("index.html");

});

app.listen(3000, function () {

    console.log("Game is running on port 3000");

});

var Grass = require("./my_modules/grass");
var GrassEater = require("./my_modules/grassEater");
var Hunter = require("./my_modules/hunter");
var Omnivore = require("./my_modules/omnivore");
var OmnivoreEater = require("./my_modules/omnivoreEater");

var matrix = []
var n = 100;
var m = 100;

function kerparner(qanak, kerpar) {
    var a = 0;
    while (a < qanak) {
        var x = Math.floor(random(0, m))
        var y = Math.floor(random(0, n)) // 

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

function generateMatrix(){

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

}

generateMatrix();