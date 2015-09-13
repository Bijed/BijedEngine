items = {
    /*
        Value has different effects depending on the type of effect the item has.
        See item.effect for details.
        price is the cost for the player. This is halved when selling the item. If there is no price, the item is unsellable.
    */
    // Recovery items
        //Healing
    Potion : {
        name : "Potion",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 20
        },
        price : 300
    },
    SuperPotion : {
        name : "Super Potion",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 50
        },
        price : 700
    },
    HyperPotion : {
        name : "Hyper Potion",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 200
        },
        price : 1200
    },
    MaxPotion : {
        name : "Max Potion",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere
        },
        price : 2500
    },
    EnergyPowder : {
        name : "Energy Powder",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 50
        },
        price : 500
    },
    EnergyRoot : {
        name : "Energy Root",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 200
        },
        price : 800
    },
    FreshWater : {
        name : "Fresh Water",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 50
        },
        price : 200
    },
    SodaPop : {
        name : "Soda Pop",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 60
        },
        price : 300
    },
    Lemonade : {
        name : "Lemonade",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 80
        },
        price : 350
    },
    MoomooMilk : {
        name : "Moomoo Milk",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 100
        },
        price : 500
    },
        //Status Healing
    Antidote : {
        name : "Antidote",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere,
            value : statuses.poison
        },
        price : 100
    },
    ParlyzHeal : {
        name : "Parlyz Heal",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere,
            value : statuses.paralysis
        },
        price : 200
    },
    Awakening : {
        name : "Awakening",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere,
            value : statuses.sleep
        },
        price : 250
    },
    BurnHeal : {
        name : "Burn Heal",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere,
            value : statuses.burn
        },
        price : 250
    },
    IceHeal : {
        name : "Ice Heal",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere,
            value : statuses.freeze
        },
        price : 250
    },
    FullHeal : {
        name : "Full Heal",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere
        },
        price : 600
    },
    LavaCookie : {
        name : "Lava Cookie",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere
        },
        price : 200
    },
    HealPowder : {
        name : "Heal Powder",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere
        },
        price : 450
    },
        //Full Recovery
    FullRestore : {
        name : "Full Restore",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere
        },
        price : 3000
    },
        //Revive
    Revive : {
        name : "Revive",
        type : item.type.recovery,
        effect : {
            type : item.effect.revive,
            situation : situations.everywhere,
            value : 1 / 2
        },
        price : 1500
    },
    MaxRevive : {
        name : "Max Revive",
        type : item.type.recovery,
        effect : {
            type : item.effect.revive,
            situation : situations.everywhere
        },
        price : 4000
    },
    RevivalHerb : {
        name : "Revival Herb",
        type : item.type.recovery,
        effect : {
            type : item.effect.revive,
            situation : situations.everywhere
        },
        price : 2800
    },
    //Berries
    CheriBerry : {
        name : "Cheri Berry",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere,
            value : statuses.paralysis
        },
        heldEffect : {
            type : item.heldEffect.use,
            condition : {
                type : item.condition.condition,
                value : statuses.paralysis
            },
            finite : true
        },
        price : 100
    },
    ChestoBerry : {
        name : "Chesto Berry",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere,
            value : statuses.sleep
        },
        heldEffect : {
            type : item.heldEffect.use,
            condition : {
                type : item.condition.condition,
                value : statuses.sleep
            },
            finite : true
        },
        price : 100
    },
    PechaBerry : {
        name : "Pecha Berry",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere,
            value : statuses.poison
        },
        heldEffect : {
            type : item.heldEffect.use,
            condition : {
                type : item.condition.condition,
                value : statuses.poison
            },
            finite : true
        },
        price : 100
    },
    RawstBerry : {
        name : "Rawst Berry",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere,
            value : statuses.burn
        },
        heldEffect : {
            type : item.heldEffect.use,
            condition : {
                type : item.condition.condition,
                value : statuses.burn
            },
            finite : true
        },
        price : 100
    },
    AspearBerry : {
        name : "Aspear Berry",
        type : item.type.recovery,
        effect : {
            type : item.effect.cure,
            situation : situations.everywhere,
            value : statuses.freeze
        },
        heldEffect : {
            type : item.heldEffect.use,
            condition : {
                type : item.condition.condition,
                value : statuses.freeze
            },
            finite : true
        },
        price : 100
    },
    OranBerry : {
        name : "Oran Berry",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 10
        },
        heldEffect : {
            type : item.heldEffect.use,
            condition : {
                type : item.condition.health,
                value : 1 / 3
            },
            finite : true
        },
        price : 100
    },
    SitrusBerry : {
        name : "Sitrus Berry",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 1 / 4
        },
        heldEffect : {
            type : item.heldEffect.use,
            condition : {
                type : item.condition.health,
                value : 1 / 3
            },
            finite : true
        },
        price : 100
    },
    FigyBerry : {
        name : "Figy Berry",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 1 / 8
        },
        heldEffect : {
            type : item.heldEffect.use,
            condition : {
                type : item.condition.health,
                value : 1 / 3
            },
            finite : true
        },
        price : 100
    },
    WikiBerry : {
        name : "Wiki Berry",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 1 / 8
        },
        heldEffect : {
            type : item.heldEffect.use,
            condition : {
                type : item.condition.health,
                value : 1 / 3
            },
            finite : true
        },
        price : 100
    },
    MagoBerry : {
        name : "Mago Berry",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 1 / 8
        },
        heldEffect : {
            type : item.heldEffect.use,
            condition : {
                type : item.condition.health,
                value : 1 / 3
            },
            finite : true
        },
        price : 100
    },
    AguavBerry : {
        name : "Aguav Berry",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 1 / 8
        },
        heldEffect : {
            type : item.heldEffect.use,
            condition : {
                type : item.condition.health,
                value : 1 / 3
            },
            finite : true
        },
        price : 100
    },
    IapapaBerry : {
        name : "Iapapa Berry",
        type : item.type.recovery,
        effect : {
            type : item.effect.heal,
            situation : situations.everywhere,
            value : 1 / 8
        },
        heldEffect : {
            type : item.heldEffect.use,
            condition : {
                type : item.condition.health,
                value : 1 / 3
            },
            finite : true
        },
        price : 100
    },
    //Stat-enhancing items
    XAttack : {
        name : "X Attack",
        type : item.type.battle,
        effect : {
            type : item.effect.enhance,
            situation : situations.battle,
            value : { attack : 1 }
        },
        price : 500
    },
    XDefend : {
        name : "X Defend",
        type : item.type.battle,
        effect : {
            type : item.effect.enhance,
            situation : situations.battle,
            value : { defence : 1 }
        },
        price : 550
    },
    XSpecial : {
        name : "X Special",
        type : item.type.battle,
        effect : {
            type : item.effect.enhance,
            situation : situations.battle,
            value : { specialAttack : 1 }
        },
        price : 350
    },
    XSpDef : {
        name : "X Sp. Def",
        type : item.type.battle,
        effect : {
            type : item.effect.enhance,
            situation : situations.battle,
            value : { specialDefence : 1 }
        },
        price : 350
    },
    XSpeed : {
        name : "X Speed",
        type : item.type.battle,
        effect : {
            type : item.effect.enhance,
            situation : situations.battle,
            value : { speed : 1 }
        },
        price : 350
    },
    XAccuracy : {
        name : "X Accuracy",
        type : item.type.battle,
        effect : {
            type : item.effect.enhance,
            situation : situations.battle,
            value : { accuracy : 1 }
        },
        price : 950
    },
    //Vitamins
    HPUp : {
        name : "HP Up",
        type : item.type.overworld,
        effect : {
            type : item.effect.boost,
            situation : situations.overworld,
            value : { hp : 10 }
        }
    },
    Protein : {
        name : "Protein",
        type : item.type.overworld,
        effect : {
            type : item.effect.boost,
            situation : situations.overworld,
            value : { attack : 10}
        }
    },
    Iron : {
        name : "Iron",
        type : item.type.overworld,
        effect : {
            type : item.effect.boost,
            situation : situations.overworld,
            value : { defence : 10}
        }
    },
    Calcium : {
        name : "Calcium",
        type : item.type.overworld,
        effect : {
            type : item.effect.boost,
            situation : situations.overworld,
            value : { specialAttack : 10}
        }
    },
    Zinc : {
        name : "Zinc",
        type : item.type.overworld,
        effect : {
            type : item.effect.boost,
            situation : situations.overworld,
            value : { specialDefence : 10}
        }
    },
    Carbos : {
        name : "Carbos",
        type : item.type.overworld,
        effect : {
            type : item.effect.boost,
            situation : situations.overworld,
            value : { speed : 10}
        }
    },
    //Battle escape items
    PokeDoll : {
        name : "Poke Doll",
        type : item.type.battle,
        effect : {
            type : item.effect.run,
            situation : situations.battle
        },
        price : 1000
    },
    FluffyTail : {
        name : "Fluffy Tail",
        type : item.type.battle,
        effect : {
            type : item.effect.run,
            situation : situations.battle
        },
        price : 1000
    },
    PokeToy : {
        name : "Poke Toy",
        type : item.type.battle,
        effect : {
            type : item.effect.run,
            situation : situations.battle
        },
        price : 1000
    },
    // Poke Balls
    PokeBall : {
        name : "Poke Ball",
        type : item.type.capture,
        effect : {
            type : item.effect.capture,
            situation : situations.battle,
            value : PokeBalls.PokeBall.catchRate
        },
        price : 200
    },
    GreatBall : {
        name : "Great Ball",
        type : item.type.capture,
        effect : {
            type : item.effect.capture,
            situation : situations.battle,
            value : PokeBalls.GreatBall.catchRate
        },
        price : 600
    },
    UltraBall : {
        name : "Ultra Ball",
        type : item.type.capture,
        effect : {
            type : item.effect.capture,
            situation : situations.battle,
            value : PokeBalls.UltraBall.catchRate
        },
        price : 1200
    },
    PremierBall : {
        name : "Premier Ball",
        type : item.type.capture,
        effect : {
            type : item.effect.capture,
            situation : situations.battle,
            value : PokeBalls.PremierBall.catchRate
        },
        price : 200
    },
    SafariBall : {
        name : "Safari Ball",
        type : item.type.capture,
        effect : {
            type : item.effect.capture,
            situation : situations.battle,
            value : PokeBalls.SafariBall.catchRate
        }
    },
    LuxuryBall : {
        name : "Luxury Ball",
        type : item.type.capture,
        effect : {
            type : item.effect.capture,
            situation : situations.battle,
            value : PokeBalls.LuxuryBall.catchRate
        },
        price : 1000
    },
    HealBall : {
        name : "Heal Ball",
        type : item.type.capture,
        effect : {
            type : item.effect.capture,
            situation : situations.battle,
            value : PokeBalls.HealBall.catchRate
        },
        price : 300
    },
    MasterBall : {
        name : "Master Ball",
        type : item.type.capture,
        effect : {
            type : item.effect.capture,
            situation : situations.battle,
            value : PokeBalls.MasterBall.catchRate
        }
    },
    CherishBall : {
        name : "Cherish Ball",
        type : item.type.capture,
        effect : {
            type : item.effect.capture,
            situation : situations.battle,
            value : PokeBalls.CherishBall.catchRate
        },
        price : 1000
    },
    // Overworld Items
        //Escape Items
    EscapeRope : {
        name : "Escape Rope",
        type : item.type.overworld,
        effect : {
            type : item.effect.exit,
            situation : situations.overworld
        },
        price : 550
    },
        //Evolution Stones
    MoonStone : {
        name : "Moon Stone",
        type : item.type.overworld,
        effect : {
            type : item.effect.evolve,
            situation : situations.overworld
        },
        price : 2100
    },
    SunStone : {
        name : "Sun Stone",
        type : item.type.overworld,
        effect : {
            type : item.effect.evolve,
            situation : situations.overworld
        },
        price : 2100
    },
    FireStone : {
        name : "Fire Stone",
        type : item.type.overworld,
        effect : {
            type : item.effect.evolve,
            situation : situations.overworld
        },
        price : 2100
    },
    LeafStone : {
        name : "Leaf Stone",
        type : item.type.overworld,
        effect : {
            type : item.effect.evolve,
            situation : situations.overworld
        },
        price : 2100
    },
    ThunderStone : {
        name : "Thunder Stone",
        type : item.type.overworld,
        effect : {
            type : item.effect.evolve,
            situation : situations.overworld
        },
        price : 2100
    },
    WaterStone : {
        name : "Water Stone",
        type : item.type.overworld,
        effect : {
            type : item.effect.evolve,
            situation : situations.overworld
        },
        price : 2100
    },
    ShinyStone : {
        name : "Shiny Stone",
        type : item.type.overworld,
        effect : {
            type : item.effect.evolve,
            situation : situations.overworld
        },
        price : 2100
    },
    DawnStone : {
        name : "Dawn Stone",
        type : item.type.overworld,
        effect : {
            type : item.effect.evolve,
            situation : situations.overworld
        },
        price : 2100
    },
    DuskStone : {
        name : "Dusk Stone",
        type : item.type.overworld,
        effect : {
            type : item.effect.evolve,
            situation : situations.overworld
        },
        price : 2100
    },
        //Repels
    Repel : {
        name : "Repel",
        type : item.type.overworld,
        effect : {
            type : item.effect.repel,
            situation : situations.overworld,
            value : 100
        },
        price : 350
    },
    SuperRepel : {
        name : "Super Repel",
        type : item.type.overworld,
        effect : {
            type : item.effect.repel,
            situation : situations.overworld,
            value : 200
        },
        price : 500
    },
    MaxRepel : {
        name : "Max Repel",
        type : item.type.overworld,
        effect : {
            type : item.effect.repel,
            situation : situations.overworld,
            value : 250
        },
        price : 700
    },
    RazorClaw : {
        name : "Razor Claw"
    }
};

console.log("Items loaded.");