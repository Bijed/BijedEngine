items.MasterBall.price = 500000;
items.MegaPotion = {
    name : "Mega Potion",
    type : item.type.recovery,
    effect : {
        type : item.effect.heal,
        situation : situations.everywhere,
        value : 100
    },
    price : 1000
};
items.MagnetBall = {
    name : "Magnet Ball",
    type : item.type.capture,
    effect : {
        type : item.effect.capture,
        situation : situations.battle,
        value : PokeBalls.PremierBall.catchRate
    },
    price : 200
};
items.Repel.value = 150;
items.SuperRepel.value = 300;
items.MaxRepel.value = 500;
items.XAttack.value = { attack : 2};
items.XDefend.value = { defence : 2};
items.XSpecial.value = { specialAttack : 2};
items.XSpDef.value = { specialDefence : 2};
items.XSpeed.value = { speed : 2};
items.XAccuracy.value = { accuracy : 2};
items.XEvasion = {
    type : item.type.battle,
    effect : {
        type : item.effect.enhance,
        situation : situations.battle,
        value : { evasion : 2}
    },
    price : 800
};
items.ParalysisHeal = items.ParlyzHeal;
items.ParlyzHeal = undefined;

Pokedex.Nincada.nextStage[1].requirements = [{type : evolution.requirements.pokeball}];

var i;
genders = {
    genderless : i = 0,
    male : ++i,
    female : ++i,
    hermaphrodite : ++i
};

Pokedex.Ditto.gender = genders.hermaphrodite;