var i;

engine = {
    version : 0.01
};

nationalities = {
    British : i = 0
};

versions = {
    red : i = 0,
    green : ++i,
    blue : ++i,
    yellow : ++i,
    gold : ++i,
    silver : ++i,
    crystal : ++i,
    ruby : ++i,
    sapphire : ++i,
    fireRed : ++i,
    leafGreen : ++i,
    emerald : ++i,
    diamond : ++i,
    pearl : ++i,
    platinum : ++i,
    heartGold : ++i,
    soulSilver : ++i,
    black : ++i,
    white : ++i,
    black2 : ++i,
    white2 : ++i,
    x : ++i,
    y : ++i,
	omegaRuby : ++i,
	alphaSapphire : ++i
};

types = {
    unknown : i = 0,
    normal : ++i,
    fighting : ++i,
    flying : ++i,
    poison : ++i,
    ground : ++i,
    rock : ++i,
    bug : ++i,
    ghost : ++i,
    steel : ++i,
    fire : ++i,
    water : ++i,
    grass : ++i,
    electric : ++i,
    psychic : ++i,
    ice : ++i,
    dragon : ++i,
    dark : ++i,
    fairy : ++i
};

genders = {
    genderless : i = 0,
    male : ++i,
    female : ++i
};

pokerus = {
    none : i = 0,
    infected : ++i,
    cured : ++i
};

catchEvents = {
    met : i = 0,
    fatefulEncounter : ++i,
    arrived : ++i,
    apparentlyMet : ++i
};

badges = {
    rock : i = 0,
    feather : ++i
};

ribbons = {
    Legend : i = 0,
    SinnohChampion : ++i
};

item = {
    type : {
        recovery : i = 0,
        capture : ++i,
        overworld : ++i,
        battle : ++i
    },
    effect : {
        restore : i = 0, // Healing and curing combined. If specified, value is the amount of health restored. No value restores all health.
        heal : ++i, // Restores health. If specified, value is the amount of health restored. No value restores all health.
        cure : ++i, // Cures status ailments. If specified, value is the condition that can be cured. No value will cure all conditions.
        revive : ++i, // Cures status ailments. If specified, value is the amount of health restored. No value restores all health.
        capture : ++i, // Attempts to catch the opposing Pokemon. If specified, value is the catch rate. No value has a 100% chance of catching.
        exit : ++i, // Returns the player to their last location on the overworld. Can only be used in caves.
        evolve : ++i, // Evolves compatible Pokemon.
        enhance : ++i, // Alters the level of one or more stats.  and how many stages it is raised by.
        repel : ++i, // Repels pokemon. value is the amount of steps the effect lasts for.
        run : ++i, // Allows the user to flee without fail from any battle with wild Pokemon.
        boost : ++i, // Increases the EV values of one or more stats. value is the affected stat and how may EVs are added.
        replenish : ++i, // Repenishes the PP of one move. If specified, value is the PP restored. No value restores all the PP.
        fullReplenish : ++i // Repenishes the PP of all moves. If specified, value is the PP restored. No value restores all the PP.
    },
    heldEffect : {
        use : i = 0 // Has the same effect when held as if the item was used normally.
    },
    condition : {
        health : i = 0, // The Pokemon's health is less than a certain amount. value is the amount of health the Pokemon must be lower than or equal to.
        condition : ++i // The Pokemon has a certain status.  If specified, value is the condition. No value will respond to any condition.
    }
};

situations = {
    everywhere : i = 0, // In the overworld or during a battle
    overworld : ++i,
    battle : ++i
};

statuses = {
    none : i = 0,
    burn : ++i,
    freeze : ++i,
    paralysis : ++i,
    poison : ++i,
    badPoison : ++i,
    sleep : ++i
};

experienceRate = {
    erratic : i = 0,
    fast : ++i,
    mediumFast : ++i,
    mediumSlow : ++i,
    slow : ++i,
    fluctuating : ++i
};

move = {
    category : {
        physical : i = 0,
        special : ++i,
        status : ++i
    },
    effect : {
        standard : function() {}, // Deals damage. Use a single argument with the value of the damage to do constant damage.
        stat : function() {}, // Modifies the target's stat by value. The single argument contains a key-value array containing stats and values.
        filter : function() {}, // Prevents the target from using a move.
        skip : function() {} // Skips to a certain effect of the move, specified by the single argument.
    }
};

capacities = {
    single : i = 0,
    all : ++i
};

weatherConditions = {
    clear : i = 0,
    rain : ++i,
    sandstorm : ++i,
    hailstorm : ++i,
    fog : ++i,
    sun : ++i
};

eggGroups = {
    monster : i = 0,
    water1 : ++i,
    water2 : ++i,
    water3 : ++i,
    bug : ++i,
    flying : ++i,
    field : ++i,
    fairy : ++i,
    grass : ++i,
    undiscovered : ++i,
    humanLike : ++i,
    mineral : ++i,
    amorphous : ++i,
    ditto : ++i,
    dragon : ++i,
    genderUnknown : ++i
};

evolution = {
    type : {
        level : i = 0, // Evolves when the Pokemon reaches a certain level. If specified, value is the minimum level at which it evolves. No value allows the Pokemon to evolve at any level.
        trade : ++i, // Evolves when the Pokemon is traded. If specified, value is the specific Pokemon with which it must be traded to evolve.
        stone : ++i // Evolves when a specific evolution stone is used on the Pokemon. value is the specific item that must be used.
    },
    requirements : {
        item : i = 0, // Only evolves if a certain item is being held. value is the item.
        time : ++i, // Only evolves if it is a cetain time of day. value is the time of day.
        move : ++i, // Only evolves if the Pokemon knows a certain move. value is the move.
        characteristic : ++i, // Only evolves if one of the Pokemon's attribute's is at a high level. value is the specific characteristic.
        friendship : ++i, // Only evolves if the Pokemon's friendship is higher than a certain value. value is this friendship level.
        pokeball : ++i, // Only evolves if the player has a Pokeball in their bag. If specified, value is a particular type of Pokeball.
        pokemon : ++i, // Only evolves if the player has a certain Pokemon in their party
        area : ++i // Only evolves if the Pokemon levels up in a certain area. value is the area
    }
};

stats = {
    hp : i = 0,
    attack : ++i,
    defence : ++i,
    specialAttack : ++i,
    specialDefence : ++i,
    speed : ++i,
    accuracy : ++i,
    evasion : ++i
};

times = {
    day : i = 0,
    night : ++i
};

directions = {
    north: - Math.PI / 2,
    east: 0,
    south: Math.PI / 2,
    west: Math.PI,
    any: 100,
    congruous: 101,
    horizontal: 102,
    vertical: 103
};

characteristics = {
    beauty : i = 0
};

grid = {
    cell : {
        width : 16,
        height : 16
    }
};

movements = {
    walking : i = 0,
    running : ++i,
    cycling : ++i,
    surfing : ++i,
    swimming : ++i,
    flying : ++i
};

tileTypes = {
    normal : i = 0, // A tile that does nothing
    brush : ++i, // A tile that causes a battle
    geminateBrush : ++i, // A tile that causes a double battle
    water : ++i, // A water tile
    hustle : ++i, // A tile that moves the player in a particular direction (such as ledges or currents)
    verglas : ++i, // An ice tile
    trammel : ++i, // An obstacle tile — affects (x_, y_)
    cant : ++i, // A slope tile
    egress : ++i, // A portal, such as a door,
    tenacious : ++i // An obstacle tile — affects (x, y)
};

iceStates = {
    untouched : i = 0,
    cracked : ++i,
    broken : ++i
};

encounterRates = {
	base : 187.5,
	grass : 100
}

console.log("Constants loaded.");