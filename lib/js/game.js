"use strict";

var _this = void 0;

fight = function fight(currentPlayer) {
  var opponent = currentPlayer.position === 0 ? _this.players[1] : _this.players[0];
  updateData();

  if (_this.round == 1) {
    opponent.attack = true;
    fightRound(currentPlayer, opponent);
  } else if (_this.round > 1) {
    getOpponentStrategy(currentPlayer, opponent);
  }
};

fightRound = function fightRound(currentPlayer, opponent) {
  if (opponent.attack == true) {
    opponent.hp -= currentPlayer.damage;
    $("#feed").append('<hr>' + currentPlayer.name + "'s made a crushing damage of " + currentPlayer.damage + " on " + opponent.name);
    fight(opponent);
  } else if (opponent.attack == false) {
    opponent.hp -= currentPlayer.damage / 2;
    $("#feed").append('<hr>' + currentPlayer.name + "'s made a crushing damage of " + currentPlayer.damage + " on " + opponent.name);
    fight(currentPlayer);
  }
  /*if (opponent.hp == 0) {
      $("#feed").append('OVER');
      break;*/

};

getOpponentStrategy = function getOpponentStrategy(currentPlayer, opponent) {
  $(".card_" + opponent.position).css("border", "3px solid red");
  $("a.defend").click(function () {
    opponent.attack == false;
    $("#feed").append('<hr>' + opponent.name + " has chosen defense!");
    fightRound(currentPlayer, opponent);
  });
  $("a.attack").click(function () {
    opponent.attack == true;
    $("#feed").append('<hr>' + opponent.name + " has chosen to attack back!");
    fightRound(currentPlayer, opponent);
  });
};

placeFightBoard = function placeFightBoard(currentPlayer) {
  currentPlayer = _this.players[currentPlayer];
  updateData();
  $("#grid").hide(2000);
  $("#gameBoard").delay(2000).fadeIn(3000);
  _this.round = 0;
  setTimeout(fight(currentPlayer), 5000);
};

changeWeapon = function changeWeapon(currentPlayer, chosenWeapon) {
  _this.players[currentPlayer].weapon = weapons[chosenWeapon].name;
  _this.players[currentPlayer].damage = weapons[chosenWeapon].damage;
  console.log(_this.players[currentPlayer].name + "'s weapon is now " + _this.players[currentPlayer].weapon);
};

updateData = function updateData() {
  $(".player1-name").html(_this.players[0].name);
  $(".player1-hp").html("Health Points : " + _this.players[0].hp);
  $(".player1-weapon").html("Weapon : " + _this.players[0].weapon);
  $(".player1-damage").html("Damage : " + _this.players[0].damage);
  $(".player2-name").html(_this.players[1].name);
  $(".player2-hp").html("Health Points : " + _this.players[1].hp);
  $(".player2-weapon").html("Weapon : " + _this.players[1].weapon);
  $(".player2-damage").html("Damage : " + _this.players[1].damage);
  $(".card_").css("border", "1px solid black");
  _this.round++;
};