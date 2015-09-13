moves = {
    /*
        Value has different effects depending on effect function used.
        See move.effect for details.
    */
    Tackle : {
        type : types.normal,
        category : move.category.physical,
        PP : 35,
        power : 50,
        accuracy : 1,
        "contact": true,
        affects : {
            opponent : {direct : true, adjacent : true},
            ally : {self : false, adjacent : true}
        },
        capacity : capacities.single,
        effect : [
            move.effect.standard
        ]
    },
    AncientPower : {
    },
    Growl : {
        type : types.normal,
        category : move.category.status,
        PP : 40,
        accuracy : 1,
        "contact": false,
        affects : {
            opponent : {direct : true, adjacent : true},
            ally : {self : false, adjacent : false}
        },
        capacity : capacities.all,
        effect : [
            function() { move.effect.stat({Attack : -1}); }
        ]
    },
    SolarBeam : {
        type : types.grass,
        category : move.category.special,
        PP : 10,
        power : 120,
        accuracy : 1,
        "contact": false,
        affects : {
            opponent : {direct : true, adjacent : true},
            ally : {self : false, adjacent : true}
        },
        capacity : capacities.single,
        effect : [
            function() { if (World.weather === weatherConditions.sun) move.effect.skip(1); else speech.state("The Pokemon is absorbing sunlight."); },
            move.effect.standard
        ]
    }
};

console.log("Moves loaded.");