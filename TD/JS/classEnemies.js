//base
class Enemy {
    constructor( 
    {
        cord = {x:0,y:0}, 
        speed= 0.5 * (cellSize / baseCellSize), 
        maxHealth = 200, 
        name = "default",
        width = cellSize*0.9,
        height = width,
        radius = width/2,
        image = null,
    } 
        ) {
        this.cord = cord
        this.radius = radius
        this.width = width
        this.height = height
        this.pathProgress = 0
        this.pathIndex = 0
        this.moneyValue = 25
        this.center = {
            x: this.cord.x + this.width / 2,
            y: this.cord.y + this.height / 2
        };
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
        this.speed = speed
        this.name = name;
        this.image = image;

        //slow down factor
        this.slowed = false;
        this.slowEffectTimer = 0;
        this.originalSpeed = this.speed;

    }
    
    draw() {
        if (this.image) {
            // Save the current context state
            ctx.save();
            
            // Translate the context to the enemy's center
            ctx.translate(this.center.x, this.center.y);
            
            // If there's a next path point, calculate the angle to rotate towards it
            if (this.pathIndex < paths.length) {
                const nextPathPoint = paths[this.pathIndex];
                const angleToNextPoint = Math.atan2(nextPathPoint.y - this.center.y, nextPathPoint.x - this.center.x);
                ctx.rotate(angleToNextPoint);
            }
            
            // Draw the image centered on the translated and rotated context
            ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            
            ctx.restore();
        } else {
            // Fallback to drawing a circle if no image is provided
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    
        const healthBarWidth = this.width * 0.7; // Width of the health bar
        const healthBarFullWidth = (healthBarWidth * this.health) / this.maxHealth; // Width of the filled part of the health bar
        const healthBarHeight = cellSize/10; // Height of the health bar
        const healthBarX = this.center.x - healthBarWidth / 2;
        const healthBarY = this.cord.y + this.radius - cellSize/2;

        ctx.fillStyle = "red";
        ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

        ctx.fillStyle = "green";
        ctx.fillRect(healthBarX, healthBarY, healthBarFullWidth, healthBarHeight);

        // Draw enemy name centered above the health bar
        const font = "bold " + (healthBarHeight*1.2).toString() +"px Helvetica"
        ctx.font = font;
        ctx.fillStyle = "black";
        const textWidth = ctx.measureText(this.name).width;
        ctx.fillText(this.name, this.center.x - textWidth / 2, healthBarY - 5);
    }
    
    
    update() {
        this.draw();
        
        // Stop updating if we"ve reached the end of the path
        if (this.pathIndex >= paths.length) {
            return;
        }
        
        this.pathProgress = this.pathIndex;
       
        if (this.slowed) {
            this.slowEffectTimer--;
            if (this.slowEffectTimer <= 0) {
                this.speed = this.originalSpeed; // Reset speed
                this.slowed = false;
            }
        }

        const path = paths[this.pathIndex];
        const distance_y = path.y - this.center.y;
        const distance_x = path.x - this.center.x;
        const angle = Math.atan2(distance_y, distance_x);
    
        const speed = this.speed;
        this.cord.x += speed * Math.cos(angle);
        this.cord.y += speed * Math.sin(angle);
        this.center = {
            x: this.cord.x + this.width / 2,
            y: this.cord.y + this.height / 2
        };
    
        // Check if the enemy has reached the next point in the path
        const distanceToTarget = Math.hypot(distance_x, distance_y);
        if (distanceToTarget < speed) {
            this.cord.x = path.x - this.width / 2;
            this.cord.y = path.y - this.height / 2;
    
            // Move to the next point in the path
            this.pathIndex++;
        }
    }
    
}

// Enemy types
class NormalEnemy extends Enemy {
    constructor(args) {
        super(args);
        this.speed = 0.5 * (cellSize / baseCellSize);
        this.maxHealth = 3000 ;
        this.health = this.maxHealth;
        this.name = "Základní Nepřítel";
        this.moneyValue = 40;
        this.image = enemyImages.normal;
    }
}

class FastEnemy extends Enemy {
    constructor(args) {
        super(args);
        this.speed = 1.4 * (cellSize / baseCellSize);
        this.maxHealth = 1000;
        this.health = this.maxHealth;
        this.name = "Rychlý nepřítel";
        this.moneyValue = 15;
        this.image = enemyImages.fast;
    }
}

class HeavyEnemy extends Enemy {
    constructor(args) {
        super(args);
        this.speed = 0.3 * (cellSize / baseCellSize);
        this.maxHealth = 13000;
        this.health = this.maxHealth;
        this.name = "Těžký nepřítel";
        this.moneyValue = 50;
        this.image = enemyImages.heavy;
    }
}

class BossEnemy extends Enemy {
    constructor(args) {
        super(args);
        this.speed = 0.2 * (cellSize / baseCellSize);
        this.maxHealth = 90000;
        this.health = this.maxHealth;
        this.name = "Boss nepřítel";
        this.moneyValue = 100;
        this.image = enemyImages.boss;
    }
}
