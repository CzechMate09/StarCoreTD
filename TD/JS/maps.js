console.log("Starting to load maps.js");

/*
BOR
STR
P
DEP
UND
END

Mapy musí dodržovat pravidlo 1:2
*/
const mapsData = {
    stage_1: {
        key: "stage_1",
        layout: [
            ["BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR"],
            ["BOR", "DEP", "DEP", "DEP", "DEP", "DEP", "DEP", "DEP", "DEP", "DEP", "DEP", "BOR"],
            ["STR", "P0" , "P1" , "DEP", "P5" , "P6" , "P7" , "DEP", "UND", "DEP", "UND", "BOR"],
            ["BOR", "DEP", "P2" , "P3" , "P4" , "DEP", "P8" , "DEP", "DEP", "DEP", "P14", "END"],
            ["BOR", "DEP", "UND", "DEP", "DEP", "DEP", "P9" , "P10", "P11", "P12", "P13", "BOR"],
            ["BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR"],
        ],
        waves: [
            [NormalEnemy, NormalEnemy, FastEnemy, NormalEnemy, NormalEnemy], 
            [FastEnemy, NormalEnemy, NormalEnemy, NormalEnemy, FastEnemy],
            [NormalEnemy, NormalEnemy, FastEnemy, HeavyEnemy, FastEnemy, BossEnemy]
        ],
    },

    stage_2: {
        key: "stage_2",
        layout: [
            ["BOR", "STR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "END", "BOR"],
            ["BOR", "P0 ", "DEP", "P10", "P11", "P12", "DEP", "P22", "P23", "P24", "DEP", "P34", "P35", "BOR"],
            ["BOR", "P1 ", "DEP", "P9 ", "UND", "P13", "DEP", "P21", "DEP", "P25", "DEP", "P33", "UND", "BOR"],
            ["BOR", "P2 ", "DEP", "P8 ", "DEP", "P14", "DEP", "P20", "DEP", "P26", "UND", "P32", "DEP", "BOR"],
            ["BOR", "P3 ", "UND", "P7 ", "DEP", "P15", "DEP", "P19", "DEP", "P27", "DEP", "P31", "DEP", "BOR"],
            ["BOR", "P4 ", "P5 ", "P6 ", "DEP", "P16", "P17", "P18", "DEP", "P28", "P29", "P30", "DEP", "BOR"],
            ["BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR"],
        ],
        waves: [
            [FastEnemy, FastEnemy, NormalEnemy, NormalEnemy],
            [HeavyEnemy, HeavyEnemy, FastEnemy, NormalEnemy, FastEnemy],
            [BossEnemy, HeavyEnemy, FastEnemy, HeavyEnemy, FastEnemy, FastEnemy,]
            
        ],
    },

    stage_3: {
        key: "stage_3",
        layout: [
            ["BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "END", "BOR"],
            ["BOR", "DEP", "DEP", "DEP", "DEP", "DEP", "DEP", "DEP", "DEP", "P15", "P16", "BOR"],
            ["STR", "P0 ", "P1 ", "DEP", "P5" , "P6 ", "P7 ", "P8 ", "UND", "P14", "DEP", "BOR"],
            ["BOR", "DEP", "P2" , "P3 ", "P4 ", "UND", "DEP", "P9 ", "DEP", "P13", "DEP", "BOR"],
            ["BOR", "DEP", "DEP", "DEP", "DEP", "DEP", "DEP", "P10", "P11", "P12", "DEP", "BOR"],
            ["BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR"],


        ],
        waves: [
            [NormalEnemy, FastEnemy, FastEnemy, HeavyEnemy],
            [NormalEnemy, NormalEnemy, FastEnemy, HeavyEnemy, HeavyEnemy],
            [FastEnemy, BossEnemy, BossEnemy, HeavyEnemy, HeavyEnemy, BossEnemy]
        ],
    },

    stage_4: {
        key: "stage_4",
        layout: [
            ["BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR"],
            ["BOR", "P4 ", "P5 ", "P6 ", "P7 ", "P8 ", "P9 ", "DEP", "P21", "P20", "P19", "BOR"],
            ["BOR", "P3 ", "DEP", "STR", "DEP", "DEP", "P10", "DEP", "END", "DEP", "P18", "BOR"],
            ["BOR", "P2 ", "P1 ", "P0 ", "UND", "DEP", "P11", "DEP", "UND", "DEP", "P17", "BOR"],
            ["BOR", "DEP", "DEP", "DEP", "DEP", "DEP", "P12", "P13", "P14", "P15", "P16", "BOR"],
            ["BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR"],
        ],
        waves: [
            [NormalEnemy, FastEnemy, FastEnemy, HeavyEnemy],
            [NormalEnemy, NormalEnemy, FastEnemy, HeavyEnemy, HeavyEnemy],
            [FastEnemy, NormalEnemy, FastEnemy, HeavyEnemy, HeavyEnemy, FastEnemy],
            [FastEnemy, BossEnemy, BossEnemy, HeavyEnemy, HeavyEnemy, BossEnemy]
        ],
    },
    stage_5: {
        key: "stage_5",
        layout: [
            ["BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR"],
            ["BOR", "DEP", "P3 ", "P4 ", "P5 ", "P6 ", "P7 ", "P8 ", "P9 ", "BOR"],
            ["BOR", "DEP", "P2 ", "DEP", "DEP", "DEP", "DEP", "DEP", "P10", "BOR"],
            ["STR", "P0 ", "P1 ", "DEP", "END", "P14", "P13", "P12", "P11", "BOR"],
            ["BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR", "BOR"],
        ],
        waves: [
            [NormalEnemy, NormalEnemy, FastEnemy, FastEnemy, HeavyEnemy, FastEnemy],
            [HeavyEnemy, BossEnemy, FastEnemy, HeavyEnemy, FastEnemy, BossEnemy],
            [BossEnemy, HeavyEnemy, FastEnemy, BossEnemy, HeavyEnemy, BossEnemy],
            [BossEnemy, FastEnemy, BossEnemy, BossEnemy, FastEnemy, HeavyEnemy, FastEnemy, HeavyEnemy, HeavyEnemy, FastEnemy],
        ],
    },
};
