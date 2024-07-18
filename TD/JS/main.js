console.log("Starting to load main.js");

var selectedMapKey = getSelectedMapFromURL();
console.log(getSelectedMapFromURL())
const selectedMapData = mapsData[selectedMapKey];
var mapLayout = selectedMapData.layout;
var mapGrid = mapLayout;
var preview = false;


//-----------------------------------------------------------------------------
// Canvas

var canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const dpi = window.devicePixelRatio;

canvas.width = window.innerWidth*0.8; //1536
canvas.height = canvas.width / 2; // 768

// ctx.fillStyle = "#71665B";
ctx.fillStyle = "transparent";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var mapGridWidth = mapGrid[0].length; // number of items in first array
var mapGridHeight = mapGrid.length //mapGridWidth
var cellSize = Math.ceil(canvas.width / mapGridWidth); //128
const baseCellSize = 128;

//
//-----------------------------------------------------------------------------
// map
const mBorder = "BOR";
const mDeployable = "DEP";
const mStart = "STR";
const mEnd = "END";
const mPath = "P";
const mUndeployable = "UND";

var paths = createPaths();

//
//-----------------------------------------------------------------------------
// Panel variables
let lives = 3;
let money = 100;

updateMoneyDisplay();
updateLivesDisplay();

//
//-----------------------------------------------------------------------------
// turrets
var turrets = [];

let selectedTowerType = null;
let selectedTowerId = null;
let isRemovalMode = false;

var range_short = cellSize + (cellSize/2);
var range_medium = cellSize *2;
var range_long = cellSize *3.5;

var hoverCell = null;
var hoveredTurret = null;
let mousePosition = { x: 0, y: 0 };

//
//-----------------------------------------------------------------------------
// game states

let isGameOver = false;
let isPaused = false;

//
//-----------------------------------------------------------------------------
// enemies

let currentWaveIndex = 0; // Reset the wave index
let enemies = []; // Your global enemies array, make sure to clear it between games

//
//-----------------------------------------------------------------------------
// other

let animationId = null; // To store the ID of the animation frame
const pauseButton = document.getElementById("pauseButton");
const settingsButton = document.getElementById("settingsButton");




//
//-----------------------------------------------------------------------------
// event listeners

// Přenačte stránku při změně okna prohlížeče
// window.addEventListener("resize", () => {
//     window.location.reload();
// });

window.addEventListener("load", () => {
    const loader = document.getElementById("page-loader");
    setTimeout(() => {
      // Start fade-out
      loader.style.opacity = "0";
      // Wait for the fade-out transition to finish before hiding the loader
      setTimeout(() => {
        loader.style.display = "none";
      }, 1000); // duration of fade-out transtition
    }, 1000); // Delay to match the stripes
});


// Mouse event listener
canvas.addEventListener("mousemove", function(event) {
    var x = event.pageX - canvas.offsetLeft,
    y = event.pageY - canvas.offsetTop;
    var gridX = Math.floor(x / cellSize),
    gridY = Math.floor(y / cellSize);
    
    mousePosition.x = x;
    mousePosition.y = y;
    hoverCell = { x: gridX, y: gridY };
    
    hoveredTurret = turrets.find(turret => (
        x >= turret.cord.x &&
        x <= turret.cord.x + turret.width &&
        y >= turret.cord.y &&
        y <= turret.cord.y + turret.height
        ));
});
    
//turns off the switch button on page load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("removeTurretToggle").checked = false;
    isRemovalMode = false;
});

document.getElementById("removeTurretToggle").addEventListener("change", function() {
    isRemovalMode = this.checked;
    //console.log("Turret removal mode: " + (isRemovalMode ? "ON" : "OFF"));
});

// Assign event listeners to all turret types
for (const [turretId, turretType] of Object.entries(turretTypes)) {
    assignTurretSelectionListener(turretId, turretType);
}

//click event listener
canvas.addEventListener("click", function(event) {
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;
    
    const gridX = Math.floor(x / cellSize);
    const gridY = Math.floor(y / cellSize);
    
    // Check if the game is paused first
    if (isPaused) {
        return; // Do nothing more if the game is paused
    }

    // If the game is not paused, proceed with the other checks
    if (isGameOver) {
        resetGameState(isGameOver);
        return; // Exit the function after handling game over state
    }

    if (isRemovalMode) {
        removeTurretAt(gridX, gridY);
        return; // Exit the function after removing a turret
    }

    // Default action if none of the above conditions are met
    placeTurretAt(gridX, gridY, cellSize, mapGrid);

});

pauseButton.addEventListener("click", function () {pauseGame(isPaused, ctx, animationId)});
settingsButton.addEventListener("click", function () {openSettings(isPaused, ctx, animationId)});

//starts the game
setTimeout(() => {
    writeToConsole("Nepřátelé přicházejí!","error")
    startWave();

}, 7000); 

animate(ctx, mapGrid, cellSize, canvas, animationId, isGameOver, isPaused);
writeToConsole("Vlna žačne za 5 sekund!","warning")
