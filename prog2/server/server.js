const { TIMEOUT } = require("dns");
var express = require("express");
var app = express();
Water = require("./my_modules/water");
Grass = require("./my_modules/grass");
GrassEater = require("./my_modules/grassEater");
Hunter = require("./my_modules/hunter");
Omnivore = require("./my_modules/omnivore");
OmnivoreEater = require("./my_modules/omnivoreEater");


app.use(express.static("../client"));
app.get("/", function (req, res) {
    res.redirect("index.html");
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);


matrix = [];
n = 50;
m = 50;
waterArr = [];
grassArr = [];
grassEaterArr = [];
OmnivoreArr = [];
OmnivoreEaterArr = [];
HunterArr = [];
weather = 1;

function kerparner(qanak, kerpar) {
    var a = 0;
    while (a < qanak) {
        var x = Math.floor(Math.random() * m)
        var y = Math.floor(Math.random() * n) // 

        if (matrix[y][x] == 0) {
            matrix[y][x] = kerpar;
        }
        else {
            var x = Math.floor(Math.random() * m)
            var y = Math.floor(Math.random() * n)

            matrix[y][x] = kerpar;
        }
        a++;
    }
}

function generateMatrix() {

    for (let i = 0; i < n; i++) {
        matrix[i] = []
        for (let j = 0; j < m; j++) {
            matrix[i].push(0)
        }
    }

    kerparner(400, 1);
    kerparner(300, 2);
    kerparner(200, 3);
    kerparner(150, 4);
    kerparner(100, 5);
    kerparner(100, 6);
    kerparner(200, 3);
    kerparner(150, 4);

}

function creatObjects() {
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
                if (OmnivoreArr.length % 2 != 0) {
                    gender = "male";
                } else {
                    gender = "female";
                }
                let omnivore = new Omnivore(x, y, 3, gender);
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

}

function StartGame() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }

    for (var i in OmnivoreArr) {
        if (weather == 4) {
            setTimeout(() => {
                if (OmnivoreArr[i] != undefined) {
                    OmnivoreArr[i].eat();
                }
            }, 3000);
        }
    }

    for (var i in OmnivoreEaterArr) {
        OmnivoreEaterArr[i].eat();
    }

    for (var i in HunterArr) {
        HunterArr[i].kill();
    }

    io.sockets.emit("my_matrix", matrix);

}

generateMatrix();
creatObjects();
setInterval(StartGame, 1000);
setInterval(ChangeWeather, 5000);
setInterval(Statistic, 5000);

io.on('connection', function (socket) {
    socket.emit("my_matrix", matrix);
});

server.listen(3000, function () {
    console.log("Game is running on port 3000");
});


function ChangeWeather() {
    if (weather == 1) {
        weather = 2;
    }
    else if (weather == 2) {
        weather = 3;
    }
    else if (weather == 3) {
        weather = 4;
    }
    else {
        weather = 1;
    }
    io.sockets.emit("weather", weather);
}

function Statistic() {
    statistic = [];

    grassC = grassArr.length;
    grassEaterC = grassEaterArr.length;
    omnivoreC = OmnivoreArr.length;
    omnivoreEaterC = OmnivoreEaterArr.length;
    hunterC = HunterArr.length;
    waterC = waterArr.length;

    statistic.push(grassC);
    statistic.push(grassEaterC);
    statistic.push(omnivoreC);
    statistic.push(omnivoreEaterC);
    statistic.push(hunterC);
    statistic.push(waterC);

    io.sockets.emit("statistic", statistic);

}
