"use strict";

function Player(position, name, hp, weapon, damage, current) {
  this.position = position;
  this.name = name;
  this.hp = 100;
  this.weapon = "hands";
  this.damage = 5;
  this.current = false, this.attack = false;
}

;
(void 0).players = [new Player(0, "Hooded Assassin", (void 0).hp, (void 0).weapon, (void 0).damage, (void 0).current, (void 0).attack), new Player(1, "Suspicious Ghoul", (void 0).hp, (void 0).weapon, (void 0).damage, (void 0).current, (void 0).attack)];