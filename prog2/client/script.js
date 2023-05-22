var socket = io();
socket.on("my_matrix", my_Draw)

function setup() {
    frameRate(5);
    createCanvas(500, 500);
    background('#acacac');
}

function my_Draw(matrix) {

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

            rect(x * 10, y * 10, 10, 10);
       }
    }
}