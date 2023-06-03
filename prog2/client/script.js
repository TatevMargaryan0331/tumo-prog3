var socket = io();
function ChangeWeather(weather) {
    if (weather === 2) {
        docWeather.innerText = "Summer";
        docWeather.style.color = "#cc9123";
        WeatherPic.src = "https://thumbs.dreamstime.com/b/tropical-beach-sand-summer-holiday-background-travel-vacation-free-space-text-product-placement-93404396.jpg";
    }
    else if (weather === 3) {
        docWeather.innerText = "Autumn";
        docWeather.style.color = "#bd5219"
        WeatherPic.src = "https://media.istockphoto.com/id/1319163336/photo/reflections.jpg?b=1&s=612x612&w=0&k=20&c=rj1miu-wc_4721xY1jdycsvueic7SbrWU87lhkZEs1U=";
    }
else if (weather === 4) {
        docWeather.innerText = "Winter";
        docWeather.style.color = "#87edad"
        WeatherPic.src = "https://media.istockphoto.com/id/1333254904/photo/long-banner-of-white-snowy-christmas-tree-background-outdoor-lights-bokeh-around-and-snow.jpg?s=612x612&w=0&k=20&c=q1BaPW4m101HtjYrjOhS_8aW0fzIeKPSOtjj8TRW9Ns=";
    }
    else {
        docWeather.innerText = "Spring";
        docWeather.style.color = "#59d95f"
        WeatherPic.src = "https://media.cntraveler.com/photos/5ea9df878abbf81d02aeae0b/4:3/w_5352,h_4014,c_limit/Kawachi-Fuji-Garden-wisteria-GettyImages-684691336.jpg";
    }

}
socket.on("my_matrix", my_Draw)
socket.on("weather", ChangeWeather)

socket.on("statistic", statisticValue)
var docWeather = document.getElementById("docWeather");
var WeatherPic = document.getElementById("WeatherPic");
const chart = document.getElementById('chart');
var StatValue = document.getElementById("StatValue");
const stormButton = document.querySelector("#storm");
const updateStatsButton = document.querySelector("#updateStats");

updateStatsButton.addEventListener("click", () => {
    window.location.reload();
});
stormButton.addEventListener("click",() => {
    return fetch("http://localhost:3000/storm");
});
function setup() {
    frameRate(5);
    createCanvas(500, 500);
    background('#acacac');
}

function my_Draw(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] === 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] === 1) {
                if (docWeather.innerText === "Spring") {
                    fill("green");
                }
                else if (docWeather.innerText === "Summer") {
                    fill("#cc9123");
                }
                else if (docWeather.innerText === "Autumn") {
                    fill("#bd5219");
                }
                else {
                    fill("#87edad");
                };
            }
            else if (matrix[y][x] === 2) {
                fill("yellow");
            }
            else if (matrix[y][x] === 3) {
                fill("red");
            }
            else if (matrix[y][x] === 4) {
                fill("brown");
            }
            else if (matrix[y][x] === 5) {
                fill("black");
            }
            else if (matrix[y][x] === 6) {
                if (docWeather.innerText === "Winter") {
                    fill("#29e6d9");
                }
                else {
                    fill("#2286e3");
                }
            }

            rect(x * 10, y * 10, 10, 10);
        }
    }
}
function statisticValue(statistic) {
    let text = "";
    const statisticCount = [];
    const statisticKerpar = [];
    for (const statisticElement of statistic) {
        statisticCount.push(statisticElement.count);
        statisticKerpar.push(statisticElement.kerpar);
        text += "There are " + statisticElement.count + " " + statisticElement.kerpar + ". ";
    }
    StatValue.innerText = text;
    new Chart(chart, {
        type: 'bar',
        data: {
            labels: statisticKerpar,
            datasets: [{
                label: 'count',
                data: statisticCount,
                backgroundColor: ['#baffc9', '#ffffba', '#ffb3ba', '#aa6f73', '#aa6f73', '#bae1ff'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            layout: {
                autoPadding: false,
                padding: 0,
            }
        }
    });
}
