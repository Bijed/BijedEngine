function Trainer(name, gender) {
    this.name = name;
    this.id = Math.round(Math.random() * 65535);
    this.secretId = Math.round(Math.random() * 65535);
    this.gender = gender;
    this.money = 3000; // The cash the player starts off with
    this.badges = {}; // The player starts off with no badges
    this.party = {}; // The player starts off with no Pokemon
}

console.log("Trainer loaded.");