let selectedMapKey = ""; // Variable to hold the selected map's key
var mapGrid;

const canvas = document.getElementById("mapPreview");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = canvas.width/2;

ctx.fillStyle = "#71665B";
ctx.fillRect(0, 0, canvas.width, canvas.height);

document.addEventListener("DOMContentLoaded", function() {

    // Attach click event listeners to each stage div
    document.querySelectorAll(".stage").forEach(function(stage) {
        stage.addEventListener("click", function() {
           
            selectedMapKey = this.getAttribute("data-map");

            // Optional: Highlight the selected stage
            document.querySelectorAll(".stage").forEach(s => s.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

    // When the start game button is clicked, navigate to the game with the selected map
    document.getElementById("startGame").addEventListener("click", function() {
        const selectedMap = document.querySelector(".stage.selected").getAttribute("data-map");
        if (selectedMapKey !== "") {
            const loader = document.getElementById("page-loader");
            loader.style.opacity = "1";
            loader.style.display = "flex";
            setTimeout(() => {
                window.location.href = "game.html?map=" + selectedMapKey;
            }, 2000);
            
        };
    });
});

var preview = true;
document.querySelectorAll(".stage").forEach(stage => {
    stage.addEventListener("click", function() {
        const mapKey = this.getAttribute("data-map");
        const selectedMapData = mapsData[mapKey];
        if (selectedMapData) {
            mapGrid = selectedMapData.layout;

            var mapGridWidth = mapGrid[0].length;
            console.log(mapGridWidth)
            var cellSize = Math.ceil(canvas.width / mapGridWidth);
            
            // Draw the selected map on the canvas
            clearCanvas()
            drawGameMap(mapGrid, cellSize);
        }
    });
});


