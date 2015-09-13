Pokedex = {
    Pupitar : {
        classification : "Hard Shell Pokemon"
    },
    Tyranitar : {
        name : "Tyranitar",
        classification : "Armour Pokemon",
        type : [types.rock, types.dark],
        experienceRate : experienceRate.slow,
        abilities : [abilities.SandStream],
        height : 2.0,
        weight : 202.0,
        catchRate : 45,
        genderRatio : 0.5,
        eggGroup : [eggGroups.monster],
        eggSteps : 10455,
        eVYield : {Attack : 3},
        baseExp : 218,
        baseStats: {
            HP : 100,
            Attack : 134,
            Defence : 110,
            SpecialAttack : 95,
            SpecialDefence : 100,
            Speed : 61
        },
        moveSet : {
            1 : [moves.ThunderFang, moves.FireFang, moves.IceFang, moves.Bite, moves.Leer, moves.Sandstorm, moves.Screech],
            14 : [moves.ChipAway],
            19 : [moves.RockSlide]
        },
        machineSet : [
            moves.HoneClaws,
            moves.DragonClaw,
            moves.Roar,
            moves.Cut,
            moves.Surf,
            moves.Strength
        ],
        get previousStage() { return Pokedex.Pupitar; },
        nextStage : [{
            get pokemon() { return Pokedex.Pupitar; },
            method : {type : evolution.type.level, value : 80}
        }]
    },
    Ditto : {

    },
    Flareon : {

    },
    Jolteon : {

    },
    Glaceon : {

    },
    Eevee : {
        name : "Eevee",
        nextStage : [
            {
                get pokemon() { return Pokedex.Flareon; },
                method : {type : evolution.type.stone, value : items.FireStone}
            },
            {
                get pokemon() { return Pokedex.Jolteon; },
                method : {type : evolution.type.stone, value : items.ThunderStone}
            },
            {
                get pokemon() { return Pokedex.Glaceon; },
                method : {type : evolution.type.level},
                requirement : [{type : evolution.requirements.area, value : "Ice Rock"}]
            }
        ]
    },
    Piloswine : {
        name : "Piloswine",
        nextStage : [{
            get pokemon() { return Pokedex.Mamoswine; },
            method : {type : evolution.type.level},
            requirement : [{type : evolution.requirements.move, value : moves.AncientPower}]
        }]
    },
    Sneasel : {
        name : "Sneasel",
        nextStage : [{
            get pokemon() { return Pokedex.Weavile; },
            method : {type : evolution.type.level},
            requirement : [
                {type : evolution.requirements.time, value : times.night},
                {type : evolution.requirements.item, value : items.RazorClaw}
            ]
        }]
    },
    Shelmet : {
        name : "Shelmet",
        nextStage : [{
            get pokemon() { return Pokedex.Accelgor; },
            method : {type : evolution.type.trade, get value() { return Pokedex.Karrablast; }}
        }]
    },
    Feebas : {
        name : "Feebas",
        nextStage : [{
            get pokemon() { return Pokedex.Milotic; },
            method : {type : evolution.type.level},
            requirement : [{type : evolution.requirements.characteristic, value : characteristics.beauty}]
        }]
    },
    Nincada : {
        name : "Nincada",
        nextStage : [
            {
                get pokemon() { return Pokedex.Ninjask; },
                method : {type : evolution.type.level, value : 20}
            },
            {
                get pokemon() { return Pokedex.Shedinja; },
                method : {type : evolution.type.level, value : 20},
                requirement : [{type : evolution.requirements.pokeball, value : PokeBalls.Pokeball}]
            }
        ]
    },
    Mantyke : {
        name : "Mantyke",
        nextStage : [{
            get pokemon() { return Pokedex.Mantine; },
            method : {type : evolution.type.level},
            requirement : [{type : evolution.requirements.pokemon, get value() { return Pokedex.Remoraid; }}]
        }]
    }
};

console.log("Pokedex loaded.");