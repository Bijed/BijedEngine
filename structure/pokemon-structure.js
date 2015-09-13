function Pokemon(species, nickname, level, shiny, ability, nature, ribbons, gender, form, experience, pokerus, caughtLevel, caughtArea, catchType, friendship, trainerName, trainerIdNumber, trainerSecretIdNumber, nationality, pokeBall, heldItem, hp, condition, iV, eV, move, version) {
    this.species = species;
    this.id = Math.round(Math.random() * 65535);
    this.nickname = nickname;
    this.level = level;
    this.shiny = shiny;
    this.ability = ability;
    this.nature = nature;
    this.ribbons = ribbons;
    this.gender = gender;
    this.form = form;
    this.experience = experience;
    this.pokerus = pokerus;
    this.caughtLevel = caughtLevel;
    this.caughtArea = caughtArea;
    this.catchType = catchType;
    this.friendship = friendship;
    this.trainerName = trainerName;
    this.trainerIdNumber = trainerIdNumber;
    this.trainerSecretIdNumber = trainerSecretIdNumber;
    this.nationality = nationality;
    this.pokeBall = pokeBall;
    this.heldItem = heldItem;
    this.hp = hp;
    this.condition = condition;
    this.iV = iV;
    this.eV = eV;
    this.move = move;
    this.version = version;
}

console.log("Pokemon loaded.");