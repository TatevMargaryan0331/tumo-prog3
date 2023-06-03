const { TIMEOUT } = require("dns");
var express = require("express");
const fs = require("fs");
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

app.get("/storm", stormFunction, (req, res) => {
    return res.sendStatus(200);
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);

const statisticFull = [];
matrix = [];
n = 50;
m = 50;
waterArr = [];
grassArr = [];
grassEaterArr = [];
OmnivoreArr = [];
OmnivoreEaterArr = [];
HunterArr = [];
//storm function
function stormFunction(next) {
    let i = 0;
    console.log('works!!!!!!!');
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            while (i < 20) {
                let water = new Water(x, y, 6);
                waterArr.push(water);

                let grass = new Grass(x, y, 1);
                grassArr.push(grass);
                ++i;
            }
        }
    }
    for (let i =0; i < 10; i++) {
        HunterArr[i].die();
    }
    for (let i =0; i < 10; i++) {
        OmnivoreArr[i].die();
    }
    for (let i =0; i < 10; i++) {
        OmnivoreEaterArr[i].die();
    }
    io.sockets.emit("my_matrix", matrix);
    return next;
}
function Statistic() {
    const statistic = [
        {
            kerpar: "Grass",
            count: grassArr.length,
        },
        {
            kerpar: "GrassEater",
            count: grassEaterArr.length,
        },
        {
            kerpar: "Omnivore",
            count: OmnivoreArr.length,
        },
        {
            kerpar: "OmnivoreEater",
            count: OmnivoreEaterArr.length,
        },
        {
            kerpar: "Hunter",
            count: HunterArr.length,
        },
        {
            kerpar: "Water",
            count: waterArr.length,
},
];
    console.log(statistic);
    statisticFull.push(statistic);
    const filePath = __dirname + "/statistics.json";
    fs.writeFile(filePath, JSON.stringify(statisticFull), "utf-8", (err) => {
        if (!err) {
            console.log("Statistic file updated!");
        }
    });
    io.sockets.emit("statistic", statistic);
}

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

}

function creatObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            switch (matrix[y][x]) {
                case 1:
                    let grass = new Grass(x, y, 1);
                    grassArr.push(grass)
                    break;
                case 2:
                    let grassEater = new GrassEater(x, y, 2);
                    grassEaterArr.push(grassEater)
                    break;
                case 3:
                    if (OmnivoreArr.length % 2 !== 0) {
                        gender = "male";
                    } else {
                        gender = "female";
                    }
                    let omnivore = new Omnivore(x, y, 3, gender);
                    OmnivoreArr.push(omnivore)
                    break;
                case 4:
                    let newOmnivoreEater = new OmnivoreEater(x, y, 4);
                    OmnivoreEaterArr.push(newOmnivoreEater)
                    break;
                case 5:
                    let hunter = new Hunter(x, y, 5);
                    HunterArr.push(hunter)
                    break;
                case 6:
                    let water = new Water(x, y, 6);
                    waterArr.push(water)
                    break;
            }
        }
    }

}

function StartGame() {

    for (let i in grassArr) {
        grassArr[i].mul();
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }

    for (let i in OmnivoreArr) {
        if (OmnivoreArr[i] !== undefined && weather !== 4) {
            OmnivoreArr[i].eat();
        }
    }

    for (let i in OmnivoreEaterArr) {
        if (weather !== 4) {
            OmnivoreEaterArr[i].eat();
        }
    }

    for (let i in HunterArr) {
        HunterArr[i].kill();
    }

    for (let i in waterArr) {
        if (weather === 3 || weather === 1) {
            waterArr[i].mul();
        }
    }


    io.sockets.emit("my_matrix", matrix);

}
generateMatrix();
creatObjects();
setInterval(Statistic, 1000);
setInterval(StartGame, 1000);
setInterval(ChangeWeather, 1000);

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


