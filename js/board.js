// Initializing the board

initialize = () => {
  var grid = document.getElementById('grid');
  grid.innerHTML = "";

  var table = new Array();

  for (let i = 0; i < 10; i++) {
    var row = document.createElement('tr');
    row.id = "row" + (i + 1);
    grid.appendChild(row);
    table[i] = new Array();

    for (let j = 0; j < 10; j++) {
      var cell = document.createElement('td');
      cell.setAttribute("data-x", j);
      cell.setAttribute("data-y", i);
      row.appendChild(cell);
    };
  };
};


launchGame = () => {

  resetBoard();

  var install = true;

  while (install = true) {

    var blockedCells = 0;
    while (blockedCells < 15) {
      var rand = getRandomNumber(0, 9);
      var rand2 = getRandomNumber(0, 9);
      $('td[data-x=' + rand + '][data-y=' + rand2 + ']').attr("type", "blocked");
      blockedCells++;
    };

    var weaponsCells = 1;
    while (weaponsCells < 5) {
      var rand = getRandomNumber(0, 9);
      var rand2 = getRandomNumber(0, 9);
      if ( !$('td[data-x=' + rand + '][data-y=' + rand2 + ']').is("[type]")) {
        $('td[data-x=' + rand + '][data-y=' + rand2 + ']').attr("weapon", weaponsCells);
        weaponsCells++;
      };
    };
    
    var playersCells = 0;
    while (playersCells < 3) {
      var rand = getRandomNumber(0, 9);
      var rand2 = getRandomNumber(0, 9);
      if ( !$('td[data-x=' + rand + '][data-y=' + rand2 + ']').is("[type]") && !$('td[data-x=' + rand + '][data-y=' + rand2 + ']').is("[weapon]") ) {
        $('td[data-x=' + rand + '][data-y=' + rand2 + ']').attr("player", playersCells);
        playersCells++;
      };
    }

    install = false;
    break;
  };

};


getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


resetBoard = () => {
  $("td").removeAttr("type");
  $("td").removeAttr("weapon");
  $("td").removeAttr("player");
};


// Initializing weapons

weapons = {
  1: {
    name: "axe",
    damage: "25",
  },
  2: {
    name: "dagger",
    damage: "20",
  },
  3: {
    name: "nunchaku",
    damage: "15",
  },
  4: {
    name: "tomahawk",
    damage: "30",
  },
  5: {
    name: "hands",
    damage: "5",
  }
};

