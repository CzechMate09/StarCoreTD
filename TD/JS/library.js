console.log("loading library");

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// Vytváření mapy

function getSelectedMapFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("map"); // gets the map from url
}

function drawGameMap(mapGrid, cellSize) {
    for (var y = 0; y < mapGrid.length; y++) {
        for (var x = 0; x < mapGrid[y].length; x++) {
            var cellValue = mapGrid[y][x];
            drawCellImage(x, y, cellValue, cellSize);

            if (preview == false) {
                if (isHoveredCell(x, y, cellValue) && isRemovalMode == false) {
                    drawHoveredImage(x, y);
                }
            }
        }
    }
}

function drawCellImage(x, y, cellValue, cellSize) {
    ctx.save(); // Save the current context state

    const centerX = x * cellSize + cellSize / 2;
    const centerY = y * cellSize + cellSize / 2;
    ctx.translate(centerX, centerY); // Move the context to the cell center

    let image;
    let rotation = getFixedCornerRotation(x, y);

    if (rotation !== null) {
        // It's a corner cell
        image = cellImages["corner"];
    } else if (cellValue === "BOR") {
        // For non-corner border cells, determine rotation based on cells
        rotation = getBorderRotation(x, y);
        image = cellImages["BOR"];
    } else {
        // Non-border cells
        rotation = 0; // No rotation
        image = cellImages[cellValue.startsWith("P") ? "P" : cellValue];
    }

    if (image) {
        ctx.rotate(rotation);
        ctx.drawImage(image, -cellSize / 2, -cellSize / 2, cellSize, cellSize);
    }

    ctx.restore(); // Restore the context to its original state
}

function getFixedCornerRotation(x, y) {
    // Top-left corner
    if (x === 0 && y === 0) return Math.PI / 2;
    // Top-right corner
    if (x === mapGrid[0].length - 1 && y === 0) return Math.PI; 
    // Bottom-left corner
    if (x === 0 && y === mapGrid.length - 1) return 0; // no ration needed
    // Bottom-right corner
    if (x === mapGrid[0].length - 1 && y === mapGrid.length - 1) return -Math.PI / 2; 

    return null; // Not a corner
}

function getBorderRotation(x, y) {
    // Directly left or right of "STR" or "END"
    if ((mapGrid[y][x - 1] && (mapGrid[y][x - 1] === "STR" || mapGrid[y][x - 1] === "END")) || 
        (mapGrid[y][x + 1] && (mapGrid[y][x + 1] === "STR" || mapGrid[y][x + 1] === "END"))) {
        return Math.PI // No rotation needed for horizontal alignment
    }
    
    // Check right (right border)
    if (x < mapGrid[0].length - 1 && mapGrid[y][x + 1] !== "BOR") return Math.PI / 2; // 90 degrees
    // Check left (left border)
    if (x > 0 && mapGrid[y][x - 1] !== "BOR") return -Math.PI / 2; // -90 degrees
    // Check above (top border)
    if (y > 0 && mapGrid[y - 1][x] !== "BOR") return 0; // 180 degrees
    // Check below (bottom border)
    if (y < mapGrid.length - 1 && mapGrid[y + 1][x] !== "BOR") return Math.PI; // 0 degrees

    return 0; // Default to no rotation if not adjacent to a non-border
}

function drawHoveredImage(x, y) {
    const hoverImage = cellImages["hover"];
    if (hoverImage) {
        ctx.drawImage(hoverImage, x * cellSize, y * cellSize, cellSize, cellSize);
    }
}

function isHoveredCell(x, y, cellValue) {
    return hoverCell && hoverCell.x === x && hoverCell.y === y && cellValue === mDeployable;
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// Malování stavů hry

function drawGameOverScreen() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "80px Helvetica";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 40);
    
    ctx.font = "40px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("Klikni pro restartování", canvas.width / 2, canvas.height / 2 + 40);
}

function drawPausedScreen() {
    ctx.save(); // saves the state of the canvas

    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "Bold 80px Helvetica";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Hra je zastavena", canvas.width / 2, canvas.height / 2 - 40);

    ctx.restore(); // Restore the saved state of the canvas
}

function drawWinningScreen() {
    let starsAwarded;
    let message;
    switch (lives) {
        case 3:
            starsAwarded = 3;
            message = "Perfektní! Porazil si všechny nepřátele bez toho aniž by žádný unikl!";
            break;
        case 2:
            starsAwarded = 2;
            message = "Dobrá práce! Ztratil si jen jeden život!";
            break;
        default:
            starsAwarded = 1;
            message = "Dobrý práce! Ale příště by to mohlo být lepší!";
            break;
    }

    const winningScreen = document.getElementById("winningScreen");
    document.getElementById("winningMessage").textContent = message;

    const starsContainer = document.getElementById("starsContainer");
    for (let i = 0; i < starsAwarded; i++) {
        starsContainer.innerHTML += '<i class="fa-solid fa-2xl fa-star" style="color: #FFD43B;"></i>';
    }
    winningScreen.classList.remove("hidden");
    winningScreen.classList.add("animate-in");
    

}

function pauseGame() {
    if (isPaused) {
        // Resume the game
        isPaused = false;
        document.getElementById("pauseButton").innerHTML = '<i class="fa-solid fa-pause"></i> Zastavit hru';
        animate(); // Restart the animation loop
        //console.log("Game Resumed");

    } else {
        // Pause the game
        isPaused = true;
        window.cancelAnimationFrame(animationId);
        document.getElementById("pauseButton").innerHTML = '<i class="fa-solid fa-play"></i> Pokračovat';
        drawPausedScreen()
        //console.log("Game Paused");
    }
}

function openSettings() {
    var settings = document.getElementById("settings");
    pauseGame();
    if (settings.style.display === "flex") {
        settings.style.display = "none";
        isPaused = false
        pauseGame();
    } else {
        settings.style.display = "flex";
    }
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// Vytváření cesty
function createPaths() {
    let paths = [];

    for (var y = 0; y < mapGrid.length; y++) {
        for (var x = 0; x < mapGrid[y].length; x++) {
            var cellValue = mapGrid[y][x];
            if (cellValue.startsWith("P")) {
                var pathNumber = parseInt(cellValue.slice(1));
                paths[pathNumber] = {
                    "x": (x * cellSize) + (cellSize / 2),
                    "y": (y * cellSize) + (cellSize / 2)
                };
            }
        }
    }

    paths.unshift(getCellCenter(mStart));
    paths.push(getCellCenter(mEnd));

    return paths;
}

function getCellCenter(mCell) {
    let cellArray = [];

    for (var y = 0; y < mapGrid.length; y++) {
        for (var x = 0; x < mapGrid[y].length; x++) {
            var cellValue = mapGrid[y][x];
            if (cellValue === mCell) {
                cellArray = {
                    "x": (x * cellSize) + (cellSize / 2),
                    "y": (y * cellSize) + (cellSize / 2)
                };
                return cellArray;
            }
        }
    }
    return cellArray;
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// Vytváření nepřátel
function createEnemy(enemyType, delay, enemies) {
    setTimeout(() => {
        enemies.push(new enemyType({
            cord: { x: paths[0].x - cellSize*0.45, y: paths[0].y - cellSize*0.45 }
        }));
    }, delay);
}

function startWave() {
    const selectedMapData = mapsData[selectedMapKey];

    // Check if we have completed all waves for the selected map
    if (currentWaveIndex >= selectedMapData.waves.length) {
        //console.log("All waves completed for", selectedMapKey);
        writeToConsole("Všechny vlny poraženy!","error")
        isGameOver = true;
        drawWinningScreen();
        window.cancelAnimationFrame(animationId);
        return; // Stop if all waves are completed
    }

    const wave = selectedMapData.waves[currentWaveIndex];
    wave.forEach((enemyType, index) => {
        let delay = 4000 * index; // Delay for enemy spawn to spread out the wave
        createEnemy(enemyType, delay, enemies);
    });

    const totalDelay = wave.length * 3000 + 5000; // Additional delay after the last enemy of the wave has spawned
    setTimeout(() => {
        checkAndStartNextWave();
        //console.log(currentWaveIndex)
    }, totalDelay);

    currentWaveIndex++;
}

function checkAndStartNextWave() {
    if (enemies.length === 0) {
        writeToConsole("Další vlna přichází!","error")
        startWave(); // Start next wave if all enemies are defeated or gone
    } else {
        setTimeout(checkAndStartNextWave, 1000); // Check every 1 second
    }
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// Logika vytváření a odstranění věží..

// Function to assign event listener to a turret type
function assignTurretSelectionListener(turretId, turretType) {
    document.getElementById(turretId).addEventListener("click", () => {
        selectedTowerType = turretType;
        
        // Hide border from the previously selected tower
        if (selectedTowerId && selectedTowerId !== turretId) {
            document.getElementById(selectedTowerId).style.border = "5px solid var(--EerieBlack)"; // Reset border for the previously selected
            //document.getElementById(selectedTowerId).style.backgroundColor = "";
        }
        
        document.getElementById(turretId).style.border = "5px solid var(--OldLace)";
        //document.getElementById(turretId).style.backgroundColor = "#F5EDDC";
        
        
        // Update the selectedTowerId with the newly selected tower
        selectedTowerId = turretId;
        document.getElementById("turret_name").innerHTML = selectedTowerType.name;
        document.getElementById("turret_damage").innerHTML = selectedTowerType.damage;
        document.getElementById("turret_radius").innerHTML = selectedTowerType.radius;
        document.getElementById("turret_fireRate").innerHTML = selectedTowerType.fireRate;
        document.getElementById("turret_cost").innerHTML = selectedTowerType.cost;
        document.getElementById("turret_info").innerHTML = selectedTowerType.info;

    });
}

function removeTurretAt(gridX, gridY) {
    for (let i = turrets.length - 1; i >= 0; i--) {
        if (turrets[i].cord.x === gridX * cellSize && turrets[i].cord.y === gridY * cellSize) {
            console.log("Turret removed!");
            money += turrets[i].constructor.cost / 2; 
            updateMoneyDisplay();
            writeToConsole("Odstranil jsi věž. Bylo ti vráceno " + (turrets[i].constructor.cost/2) + " peněz", "info");
            turrets.splice(i, 1);
            return;
        }
    }
}

function placeTurretAt(gridX, gridY) {
    if (!selectedTowerType) return;
    
    if (isLocationOccupied(gridX, gridY)) {
        writeToConsole("Věž už na dané pozici existuje!", "warning")
        return;
    }

    if (isValidPlacementLocation(gridX, gridY)) {
        if (money >= selectedTowerType.cost) {
            const turret = new selectedTowerType({ cord: {x: gridX * cellSize, y: gridY * cellSize} });
            money -= selectedTowerType.cost;
            updateMoneyDisplay();
            turrets.push(turret);
            writeToConsole("Postavil jsi novou věž.", "success");
        } else {
            writeToConsole("Nemáš dostatek peněz na postavení věže!", "warning");
        }
    }
}

function isLocationOccupied(gridX, gridY) {
    return turrets.some(turret => turret.cord.x === gridX * cellSize && turret.cord.y === gridY * cellSize);
}

function isValidPlacementLocation(gridX, gridY) {
    return mapGrid[gridY][gridX] === mDeployable;
}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// Pomocné funkce

function resetGameState() {
    isGameOver = false;
    window.location.reload(); // Reloads page
}

function writeToConsole(message, type) {
    const consoleDiv = document.getElementById("ConsoleMessages");
    const messageElement = document.createElement("div");
    messageElement.textContent = message;

    switch(type) {
        case "info":
            messageElement.style.color = "lightblue";
            break;
        case "success":
            messageElement.style.color = "lightgreen";
            break;
        case "warning":
            messageElement.style.color = "yellow";
            break;
        case "error":
            messageElement.style.color = "red";
            break;
        default:
            messageElement.style.color = "white";
    }
    
    // Append the new message
    consoleDiv.appendChild(messageElement);
    
    // Scroll to the bottom to ensure the latest message is visible
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

function updateMoneyDisplay() {
    document.querySelector("#Money").innerHTML = money;
}
function updateLivesDisplay() {
    document.querySelector("#Lives").innerHTML = lives;
}

function drawXAtMousePosition() {

        const xCenter = mousePosition.x;
        const yCenter = mousePosition.y;

        // Draw the image
        ctx.drawImage(turretImages.removalIcon, xCenter - cellSize/2, yCenter - cellSize/2, cellSize, cellSize);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// Hlavná herní smyčka
function animate() {
    if (!isGameOver && !isPaused) {
        
        animationId = window.requestAnimationFrame(animate)
        clearCanvas();
        // ctx.fillStyle = "#71665B";
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawGameMap(mapGrid, cellSize);
    
        turrets.forEach(turret => {
            turret.update();
            
            turret.projectiles.forEach((projectile, i) => {
                projectile.update();
                
                const distance = calculateDistance(projectile.cord.x, projectile.cord.y, projectile.enemy.center.x, projectile.enemy.center.y);
                
                if (distance < projectile.enemy.radius + projectile.radius) {
                    projectile.applyDamage(projectile.enemy);
                    turret.projectiles.splice(i, 1); // Remove the projectile
                }
            });
        });

        enemies.forEach((enemy, i) => {
            enemy.update();
    
            let endCord = getCellCenter(mEnd);
            endCord.x -= enemy.radius;
            endCord.y -= enemy.radius;
    
            if(enemy.cord.x === endCord.x && enemy.cord.y === endCord.y) {
                writeToConsole("Nepřítel unikl!", "error");
                lives -= 1;
                enemies.splice(i, 1);
                updateLivesDisplay();
            }
        });
        
        enemies.forEach((enemy, i) => {
            if (enemy.health <= 0) {
                enemies.splice(i, 1);
                money += enemy.moneyValue;
                document.querySelector("#Money").innerHTML = money;
                writeToConsole("Bylo ti přičteno " + enemy.moneyValue + " peněz za poražení nepřítele.", "ifno");
            }
        });
    
        if (isRemovalMode) { 
            drawXAtMousePosition();
        }
    
         if (lives <= 0) {
            isGameOver = true;
            drawGameOverScreen();
            window.cancelAnimationFrame(animationId); // Stop the game loop
        }
        
    }
}