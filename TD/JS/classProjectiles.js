// Utility function to calculate distance
function calculateDistance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}


function drawProjectile(startX, startY, radius, color) {
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.stroke();
    ctx.fill();
}

class Projectile {
    constructor({cord = {x:0, y:0}, enemy, damage, turret}) {
        this.cord = cord;
        this.velocity = {x: 0, y: 0};
        this.enemy = enemy;
        this.radius = 3;
        this.damage = damage;
        this.turret = turret;
    }

    draw() {
        drawProjectile(this.cord.x, this.cord.y, this.radius, "black");
    }

    update() {
        this.draw();
        const angle = Math.atan2(this.enemy.center.y - this.cord.y, this.enemy.center.x - this.cord.x);
        const power = 5;
        this.velocity.x = Math.cos(angle) * power;
        this.velocity.y = Math.sin(angle) * power;
        this.cord.x += this.velocity.x;
        this.cord.y += this.velocity.y;
    }

    applyDamage(target) {
        target.health -= this.damage;
    }
}

class SniperProjectile extends Projectile {
    constructor({ cord, enemy, damage }) {
        super({ cord, enemy, damage });
    }
}

class SplashProjectile extends Projectile {
    constructor({ cord, enemy, damage, splashRadius, splashDamage, turret }) {
        super({ cord, enemy, damage, turret });
        this.splashRadius = splashRadius;
        this.splashDamage = splashDamage;
    }

    applyDamage(target) {
        super.applyDamage(target);  // Apply damage to the primary target

        // Apply splash damage to other enemies
        enemies.forEach(enemy => {
            if (calculateDistance(this.cord.x, this.cord.y, enemy.center.x, enemy.center.y) <= this.splashRadius) {
                enemy.health -= this.splashDamage;
            }
        });
    }

    update() {
        super.update();
        if (calculateDistance(this.cord.x, this.cord.y, this.enemy.center.x, this.enemy.center.y) < this.enemy.radius + this.radius) {
            this.applyDamage(this.enemy);
        }
    }
}
