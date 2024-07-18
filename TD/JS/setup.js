const cellImages = {
    "P": new Image(),
    "STR": new Image(),
    "END": new Image(),
    "DEP": new Image(),
    "BOR": new Image(),
    "UND": new Image(),
    "corner": new Image(),
    "hover": new Image()
};

cellImages["P"].src = "./img/map/P.svg";
cellImages["STR"].src = "./img/map/STR.svg";
cellImages["END"].src = "./img/map/END.svg";
cellImages["DEP"].src = "./img/map/DEP.svg";
cellImages["BOR"].src = "./img/map/BOR.svg";
cellImages["hover"].src = "./img/map/HoveredCell.svg";
cellImages["corner"].src = "./img/map/corner.svg";
cellImages["UND"].src = "./img/map/UND.svg";

const enemyImages = {
    normal: new Image(),
    fast: new Image(),
    heavy: new Image(),
    boss: new Image(),
};

enemyImages.normal.src = "./img/enemies/ship_normal.svg";
enemyImages.fast.src = "./img/enemies/ship_fast.svg";
enemyImages.heavy.src = "./img/enemies/ship_heavy.svg";
enemyImages.boss.src = "./img/enemies/ship_boss.svg";


const turretTypes = {
    "BasicTurret": Turret,
    "SniperTurret": SniperTurret,
    "SplashTurret": SplashTurret,
    "SlowTurret": SlowTurret
};

const turretImages = {
    base: new Image(),
    normal: new Image(),
    sniper: new Image(),
    splash: new Image(),
    slow: new Image(),
    double: new Image(),
};

turretImages.base.src = "./img/turrets/turret_base.svg";
turretImages.normal.src = "./img/turrets/turret_normal.svg";
turretImages.sniper.src = "./img/turrets/turret_sniper.svg"; 
turretImages.splash.src = "./img/turrets/turret_splash.svg"; 
turretImages.double.src = "./img/turrets/turret_double.svg"; 
turretImages.slow.src = "./img/turrets/turret_slow.svg"; 

turretImages.removalIcon = new Image();
turretImages.removalIcon.src = "./img/xMark.svg";
