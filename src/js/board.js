// Initializing the board
window.addEventListener("load", function (event) {
  initialize();
});


initialize = () => {
  $("#preview").show();
  var grid = document.getElementById('grid');
  grid.innerHTML = "";

  var table = new Array();

  for (let i = 0; i < 10; i++) {
    var row = document.createElement('tr');
    row.id = "row" + (i + 1);
    grid.appendChild(row);
    for (let j = 0; j < 10; j++) {
      var cell = document.createElement('td');
      cell.setAttribute("data-x", j);
      cell.setAttribute("data-y", i);
      row.appendChild(cell);
    };
  };
  $(".game").hide();
  $("#gameBoard").hide();
  $("#results").hide();
  document.getElementById("start").addEventListener("click", function () {
    if (document.getElementById("firstName").value.length > 0) {
      var firstPlayerName = document.getElementById("firstName").value;
    } 
    if (document.getElementById("secondName").value.length > 0) {
      var secondPlayerName = document.getElementById("secondName").value;
    };
    launchGame(firstPlayerName, secondPlayerName);
  });
};

launchGame = (firstPlayerName, secondPlayerName) => {
  $("#preview").hide();
  $(".game").show();
  resetBoard();

  var install = true;
  const blockedCells = 14;
  const weaponsCells = 5;
  const playersCells = 2;

  while (install = true) {

    var getCells = 0;
    while (getCells < blockedCells) {
      var rand = getRandomNumber();
      var rand2 = getRandomNumber();
      $('td[data-x=' + rand + '][data-y=' + rand2 + ']').attr("type", "blocked");
      getCells++;
      console.log(rand + " " + rand2)
    };

    var getWeapons = 0;
    while (getWeapons < weaponsCells) {
      var rand = getRandomNumber();
      var rand2 = getRandomNumber();
      if (!$('td[data-x=' + rand + '][data-y=' + rand2 + ']').is("[type]")) {
        $('td[data-x=' + rand + '][data-y=' + rand2 + ']').attr("weapon", getWeapons);
        getWeapons++;
      };
    };

    var getCells = 0;
    while (getCells < playersCells) {
      var rand = getRandomNumber();
      var rand2 = getRandomNumber();
      if (!$('td[data-x=' + rand + '][data-y=' + rand2 + ']').is("[type]") && !$('td[data-x=' + rand + '][data-y=' + rand2 + ']').is("[weapon]")) {
        $('td[data-x=' + rand + '][data-y=' + rand2 + ']').attr("player", getCells);
        getCells++;
      };
    }

    install = false;
    break;
  };
  $("#feed").append('Welcome to this game<br>');

  var currentPlayer = {};
  $('td[player=0]').attr('currentPlayer', false);
  $('td[player=1]').attr('currentPlayer', false);
  var random = Math.floor((Math.random() * 2));
  $('td[player=' + random + ']').attr('currentPlayer', true);
  firstPlayerName && (this.players[0].name = firstPlayerName);
  secondPlayerName && (this.players[1].name = secondPlayerName);
  isCurrentlyPlaying(currentPlayer);
};

getRandomNumber = () => {
  return Math.floor(Math.random() * (9 + 1));
};

resetBoard = () => {
  $("td").removeAttr("type");
  $("td").removeAttr("weapon");
  $("td").removeAttr("player");
  $("td").removeAttr("goto");
  $("td").removeAttr("changePosition");
  $("td").removeAttr("currentPlayer");

  $("#feed").empty();
  $("#grid").show();
  $("#gameBoard").hide();
};

isCurrentlyPlaying = (currentPlayer) => {
  currentPlayer.x = ($('td[currentPlayer=true]').data('x'));
  currentPlayer.y = ($('td[currentPlayer=true]').data('y'));
  currentPlayer.number = parseInt(($('td[currentPlayer=true]').attr('player')));
  $("#feed").append(this.players[currentPlayer.number].name + " is currently playing"  + '<br>');
  console.log(currentPlayer)
  scanAccessibleCases(currentPlayer, 3);
};

scanAccessibleCases = (currentPlayer, params) => {
  console.log(currentPlayer);
  this.accessibleCases = [];

  for (let i = 1; i < params; i++) {
    var left = $('td[data-x=' + (currentPlayer.x - i) + '][data-y=' + (currentPlayer.y) + ']');
    var down = $('td[data-x=' + (currentPlayer.x) + '][data-y=' + (currentPlayer.y + i) + ']');
    var right = $('td[data-x=' + (currentPlayer.x + i) + '][data-y=' + (currentPlayer.y) + ']');
    var up = $('td[data-x=' + (currentPlayer.x) + '][data-y=' + (currentPlayer.y - i) + ']');
    this.accessibleCases.push(left, down, right, up);
  };
  isAccessible(currentPlayer);
};


isAccessible = (currentPlayer) => {
  for (let i = this.accessibleCases.length; i >= 0; i--) {
    if (($(this.accessibleCases[i]).is("[type]")) || ($(this.accessibleCases[i - 4]).is("[type]")) || ($(this.accessibleCases[i - 4]).is("[weapon]"))) {
    }
    else if (($(this.accessibleCases[i]).is("[weapon]"))) {
      $(this.accessibleCases[i]).attr("goto", true);
    }
    else if (($(this.accessibleCases[i]).is("[player]") || ($(this.accessibleCases[i - 4]).is("[player]")))) {
      placeFightBoard(currentPlayer.number);
      break;
    } else {
      $(this.accessibleCases[i]).attr("goto", true);
      $(this.accessibleCases[i]).attr("changePosition", true);
    };
  };
  move(currentPlayer);
};


nextToPlayer = (currentPlayer) => {
  for (let i = 1; i < 2; i++) {
    if ($('td[data-x=' + (currentPlayer.x - i) + '][data-y=' + (currentPlayer.y) + ']').is("[player]") || 
        $('td[data-x=' + (currentPlayer.x) + '][data-y=' + (currentPlayer.y + i) + ']').is("[player]") ||
        $('td[data-x=' + (currentPlayer.x + i) + '][data-y=' + (currentPlayer.y) + ']').is("[player]") || 
        $('td[data-x=' + (currentPlayer.x) + '][data-y=' + (currentPlayer.y - i) + ']').is("[player]")) {
         return placeFightBoard(currentPlayer);
    };
  };
};


move = (currentPlayer) => {
  $("td[goto=true]").off().on("click", function () {
    if ($(this).is("[goto]")) {
    currentPlayer.x = $(this).data('x');
    currentPlayer.y = $(this).data('y');
    $("td[player=" + currentPlayer.number + "]").removeAttr("currentPlayer");
    $("td[player=" + currentPlayer.number + "]").removeAttr("player");
    if ($(this).is("[changePosition]")) {
      $("td").removeAttr("changePosition");
      $("td").removeAttr("goto");
      $($(this)).attr('player', currentPlayer.number);
      $($(this)).attr('currentPlayer', true);
    }

    if ($(this).is("[weapon]")) {
      $("td").removeAttr("changePosition");
      $("td").removeAttr("goto");
      $($(this)).attr('player', currentPlayer.number);
      $($(this)).attr('currentPlayer', true);
      var chosenWeapon = parseInt($(this).attr('weapon'));
      changeWeapon(currentPlayer.number, chosenWeapon);
    }

    if ($(this).is("[player]") && $(this).is("[currentPlayer=false]")) {
      placeFightBoard(currentPlayer.number);
    };
    nextToPlayer(currentPlayer);
    $(this).removeAttr("currentPlayer");
    $("td[currentPlayer=false]").attr("currentPlayer", true);
    $("td[player=" + currentPlayer.number + "]").attr("currentPlayer", false);
    currentPlayer = {};
    isCurrentlyPlaying(currentPlayer)
  }
  })
};


// Initializing weapons

weapons = {
  1: {
    name: "axe",
    damage: 25,
  },
  2: {
    name: "dagger",
    damage: 20,
  },
  3: {
    name: "nunchaku",
    damage: 15,
  },
  4: {
    name: "tomahawk",
    damage: 30,
  },
  5: {
    name: "hands",
    damage: 5,
  }
};
