class Turret {
    static name = "Základní věž"
    static cost = 40;
    static damage = 90;
    static fireRate = "střední";
    static radius = "střední";
    static info = "Základní věž";

    constructor({cord = {x:0,y:0}}) {
        this.cord = cord;
        this.width = cellSize;
        this.height = cellSize;
        this.center = {
            x: this.cord.x + this.width / 2,
            y: this.cord.y + this.height / 2,
        }

        this.projectiles = []
        this.radius = range_medium; // Range of the turret
        this.damage = Turret.damage; // Damage to the primary target
        this.fireRate = 70; // Fire rate
        this.target;
        this.frames = 0;
        this.lastAngle = 0;
        this.imageSrc = turretImages.normal;
        this.cost = Turret.cost;
        this.name = Turret.name;
        this.radiusColor = "rgba(0, 0, 0, 0.2)";
    }
    
    drawTurret() {
        ctx.drawImage(turretImages.base, this.cord.x, this.cord.y, this.width, this.height);
        ctx.save();
        ctx.translate(this.center.x, this.center.y);

        if (this.target) {
            // Calculate angle to target
            this.lastAngle = Math.atan2(this.target.center.y - this.center.y, this.target.center.x - this.center.x);
        }
        
        ctx.rotate(this.lastAngle);

        // pivot is in the center of the image
        ctx.drawImage(this.imageSrc, -this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore();
    }
    
    drawRadius() {
        if (hoveredTurret === this) {
            ctx.beginPath();
            ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.radiusColor;
            ctx.fill();
        }
    }

    acquireTarget() {
        let furthestProgress = -1;
        this.target = null; // Reset target
        
        enemies.forEach(enemy => {
            const distance = Math.hypot(enemy.center.x - this.center.x, enemy.center.y - this.center.y);
            if (distance < this.radius && enemy.pathProgress > furthestProgress && enemy.health > 0) {
                this.target = enemy;
                furthestProgress = enemy.pathProgress;
            }
        });
    }
    
    
    fireProjectile(ProjectileType) {
        if (this.frames % this.fireRate === 0 && this.target) {
            this.projectiles.push(new ProjectileType({
                cord: {x: this.center.x, y: this.center.y},
                enemy: this.target,
                damage: this.damage,
                turret: this
            }));
        }
        this.frames++;
    }

    update() {
        this.drawTurret();
        this.drawRadius();
        this.acquireTarget();
        this.fireProjectile(Projectile);
    }
}

class SniperTurret extends Turret {
    static name = "Odstřelovací věž"
    static cost = 150;
    static damage = 4000;
    static fireRate = "pomalá";
    static radius = "dlouhý";
    static info = "Věž s vysokou sílou, dlouhým dosahem, ale s pomalou rychlostí střelby";

    constructor(cord) {
        super(cord);
        this.radius = range_long;
        this.damage = SniperTurret.damage;
        this.fireRate = 300;
        this.imageSrc = turretImages.sniper
    }

    update() {
        this.drawTurret();
        this.drawRadius();
        this.acquireTarget();
        this.fireProjectile(SniperProjectile);
    }
}

//splash turret
class SplashTurret extends Turret {
    static name = "Věž s rozptylovou střelbou"
    static cost = 70;
    static damage = 120;
    static fireRate = "pomalá";
    static radius = "střední";
    static info = "Projektil dokáže zasáhnout několik nepřátel na jednou.";

    constructor(cord) {
        super(cord);
        this.radius = range_short; 
        this.splashRadius = this.radius/1.2; // Radius of splash damage
        this.damage = SplashTurret.damage;
        this.splashDamage = this.damage; // Damage to other enemies within the splash radius
        this.fireRate = 250; 
        this.imageSrc = turretImages.splash
    }

    fireProjectile() {
        if (this.frames % this.fireRate === 0 && this.target) {
            this.projectiles.push(new SplashProjectile({
                cord: {x: this.center.x, y: this.center.y},
                enemy: this.target,
                damage: this.damage,
                splashRadius: this.splashRadius,
                splashDamage: this.splashDamage,
                turret: this
            }));
        }
        this.frames++;
    }

    update() {
        this.drawTurret();
        this.drawRadius();
        this.acquireTarget();
        this.fireProjectile();
    }
}

//slow down turret
class SlowTurret extends Turret {
    static name = "Zpomalovací věž"
    static cost = 30;
    static damage = "žádná";
    static fireRate = "žádná";
    static radius = "krátký";
    static info = "Zpomalí nepřátele v dosahu o 50% své rychlosti.";

    constructor(cord) {
        super(cord);
        this.radius = range_short;
        this.slowAmount = 0.5; // Slowdown factor (0.5 = 50% slowed)
        this.effectDuration = 60;
        this.imageSrc = turretImages.slow
    }

    applySlowEffect(enemy) {
        if (!enemy.slowed) {
            enemy.originalSpeed = enemy.speed;
            enemy.speed *= this.slowAmount;
            enemy.slowed = true;
            enemy.slowEffectTimer = this.effectDuration;
        }
    }

    update() {
        this.drawTurret();
        this.drawRadius();

        // Apply slow effect to enemies within range
        enemies.forEach(enemy => {
            const distance = calculateDistance(this.center.x, this.center.y, enemy.center.x, enemy.center.y);
            if (distance < this.radius) {
                this.applySlowEffect(enemy);
            }
        });
    }
}






