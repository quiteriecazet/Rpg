"use strict";

var _this = void 0;

// Initializing the board
window.addEventListener("load", function (event) {
  initialize();
});

initialize = function initialize() {
  var grid = document.getElementById('grid');
  grid.innerHTML = "";
  var table = new Array();

  for (var i = 0; i < 10; i++) {
    var row = document.createElement('tr');
    row.id = "row" + (i + 1);
    grid.appendChild(row);

    for (var j = 0; j < 10; j++) {
      var cell = document.createElement('td');
      cell.setAttribute("data-x", j);
      cell.setAttribute("data-y", i);
      row.appendChild(cell);
    }

    ;
  }

  ;
  $(".game").hide();
  $("#gameBoard").hide();
  document.getElementById("start").addEventListener("click", function () {
    if (document.getElementById("firstName").value.length > 0) {
      var firstPlayerName = document.getElementById("firstName").value;
    } else if (document.getElementById("secondName").value.length > 0) {
      var secondPlayerName = document.getElementById("secondName").value;
    }

    ;
    launchGame(firstPlayerName, secondPlayerName);
  });
};

launchGame = function launchGame(firstPlayerName, secondPlayerName) {
  $(".preview").hide();
  $(".game").show();
  resetBoard();
  var install = true;
  var blockedCells = 12;
  var weaponsCells = 5;
  var playersCells = 2;

  while (install = true) {
    var getCells = 0;

    while (getCells < blockedCells) {
      var rand = getRandomNumber();
      var rand2 = getRandomNumber();
      $('td[data-x=' + rand + '][data-y=' + rand2 + ']').attr("type", "blocked");
      getCells++;
      console.log(rand + " " + rand2);
    }

    ;
    var getWeapons = 0;

    while (getWeapons < weaponsCells) {
      var rand = getRandomNumber();
      var rand2 = getRandomNumber();

      if (!$('td[data-x=' + rand + '][data-y=' + rand2 + ']').is("[type]")) {
        $('td[data-x=' + rand + '][data-y=' + rand2 + ']').attr("weapon", getWeapons);
        getWeapons++;
      }

      ;
    }

    ;
    var getCells = 0;

    while (getCells < playersCells) {
      var rand = getRandomNumber();
      var rand2 = getRandomNumber();

      if (!$('td[data-x=' + rand + '][data-y=' + rand2 + ']').is("[type]") && !$('td[data-x=' + rand + '][data-y=' + rand2 + ']').is("[weapon]")) {
        $('td[data-x=' + rand + '][data-y=' + rand2 + ']').attr("player", getCells);
        getCells++;
      }

      ;
    }

    install = false;
    break;
  }

  ;
  $("#feed").append('<hr>Welcome to this game');
  var currentPlayer = {};
  $('td[player=0]').attr('currentPlayer', false);
  $('td[player=1]').attr('currentPlayer', false);
  var random = Math.floor(Math.random() * 2);
  $('td[player=' + random + ']').attr('currentPlayer', true);
  isCurrentlyPlaying(currentPlayer);
  firstPlayerName && (_this.players[0].name = firstPlayerName);
  secondPlayerName && (_this.players[1].name = secondPlayerName);
};

getRandomNumber = function getRandomNumber() {
  return Math.floor(Math.random() * (9 + 1));
};

resetBoard = function resetBoard() {
  $("td").removeAttr("type");
  $("td").removeAttr("weapon");
  $("td").removeAttr("player");
  $("td").removeAttr("goTo");
  $("td").removeAttr("changePosition");
  $("td").removeAttr("currentPlayer");
  $("#feed").empty();
  $("#grid").show();
  $("#gameBoard").hide();
};

isCurrentlyPlaying = function isCurrentlyPlaying(currentPlayer) {
  currentPlayer.x = $('td[currentPlayer=true]').data('x');
  currentPlayer.y = $('td[currentPlayer=true]').data('y');
  currentPlayer.number = parseInt($('td[currentPlayer=true]').attr('player'));
  $("#feed").append('<hr>' + _this.players[currentPlayer.number].name + " is currently playing");
  console.log(currentPlayer);
  isAccessible(currentPlayer);
  move(currentPlayer);
};

isAccessible = function isAccessible(currentPlayer) {
  console.log(currentPlayer);
  var accessibleCases = [];

  for (var i = 1; i < 3; i++) {
    var left = $('td[data-x=' + (currentPlayer.x - i) + '][data-y=' + currentPlayer.y + ']');
    var down = $('td[data-x=' + currentPlayer.x + '][data-y=' + (currentPlayer.y + i) + ']');
    var right = $('td[data-x=' + (currentPlayer.x + i) + '][data-y=' + currentPlayer.y + ']');
    var up = $('td[data-x=' + currentPlayer.x + '][data-y=' + (currentPlayer.y - i) + ']');
    accessibleCases.push(left, down, right, up);
  }

  ;
  console.log(accessibleCases);

  for (var _i = accessibleCases.length; _i >= 0; _i--) {
    if ($(accessibleCases[_i]).is("[type]") || $(accessibleCases[_i - 4]).is("[type]") || $(accessibleCases[_i]).is("[weapon]") || $(accessibleCases[_i - 4]).is("[weapon]")) {
      $(accessibleCases[_i]).attr("goTo", "true");
    } else if ($(accessibleCases[_i]).is("[player]") || $(accessibleCases[_i - 4]).is("[player]")) {
      placeFightBoard(currentPlayer.number);
      break;
    } else {
      $(accessibleCases[_i]).attr("goTo", "true");
      $(accessibleCases[_i]).attr("changePosition", "true");
    }

    ;
  }

  ;
};

move = function move(currentPlayer) {
  $("td[goTo]").click(function () {
    currentPlayer.x = $(this).data('x');
    currentPlayer.y = $(this).data('y');
    $("td[player=" + currentPlayer.number + "]").removeAttr("currentPlayer");
    $("td[player=" + currentPlayer.number + "]").removeAttr("player");

    if ($(this).is("[changePosition]")) {
      $("td").removeAttr("changePosition");
      $("td").removeAttr("goTo");
      $($(this)).attr('player', currentPlayer.number);
      $($(this)).attr('currentPlayer', true);
    }

    if ($(this).is("[weapon]")) {
      $("td").removeAttr("changePosition");
      $("td").removeAttr("goTo");
      $($(this)).attr('player', currentPlayer.number);
      $($(this)).attr('currentPlayer', true);
      var chosenWeapon = parseInt($(this).attr('weapon'));
      changeWeapon(currentPlayer.number, chosenWeapon);
    }

    if ($(this).is("[player]") && $(this).is("[currentPlayer=false")) {
      placeFightBoard(currentPlayer.number);
    }

    ;
    $(this).removeAttr("currentPlayer");
    $("td[currentPlayer=false]").attr("currentPlayer", true);
    $("td[player=" + currentPlayer.number + "]").attr("currentPlayer", false);
    currentPlayer = {};
    isCurrentlyPlaying(currentPlayer);
  });
}; // Initializing weapons


weapons = {
  1: {
    name: "axe",
    damage: 25
  },
  2: {
    name: "dagger",
    damage: 20
  },
  3: {
    name: "nunchaku",
    damage: 15
  },
  4: {
    name: "tomahawk",
    damage: 30
  },
  5: {
    name: "hands",
    damage: 5
  }
};