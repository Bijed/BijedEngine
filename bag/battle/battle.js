canvas = undefined;
player = undefined;
window.onload = function() {
    canvas = document.getElementById("game");
    canvas.width = 336;
    canvas.height = 240;
    canvas.ctx = canvas.getContext("2d");
    canvas.entities = [];

    canvas.draw = function() {
        this.ctx.fillStyle = "hsl(0, 0%, 90%)";
        this.ctx.fillRect(0, 0, this.width, this.height);

        for (var i = 0; i < this.entities.length; ++i)
            this.entities[i].draw(this.ctx);
    };

    canvas.draw();

    player = new Trainer("Glen", genders.male);
    player.party = new Party([
        new Pokemon(Pokedex.Tyranitar, undefined, 70, false, Pokedex.Tyranitar.ability[0], natures.Adamant, [], genders.male, 0, 0, pokerus.none, 1, "Some string", catchEvents.met, 255, player.name, player.id, player.secretId, nationalities.British, PokeBalls.PokeBall, undefined, 5, conditions.none, [], [], [moves.SolarBeam], versions.fireRed)
    ]);
    alert("Battle system ready.");
};