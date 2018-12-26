

function Player(position, name, hp, weapon, damage, current) {
    this.position = position;
    this.name = name;
    this.hp = 100;
    this.weapon = "hands";
    this.damage = 5;
    this.current = false,
    this.attack = false
};


this.players = [
    new Player(0, "Hooded Assassin", this.hp, this.weapon, this.damage, this.current, this.attack),
    new Player(1, "Suspicious Ghoul", this.hp, this.weapon, this.damage, this.current, this.attack)
];