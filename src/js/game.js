placeFightBoard = (currentPlayer) => {
    this.currentPlayer = this.players[currentPlayer];
    updateData();
    $("#grid").hide(1000);
    $("#gameBoard").delay(1000).fadeIn(1500);
    this.round = 0;
    setTimeout(function () { fight(currentPlayer) }, 4500);
};

fight = (currentPlayer) => {
    this.currentPlayer = currentPlayer.position === 0 ? this.players[0] : this.players[1];
    this.opponent = this.currentPlayer.position === 0 ? this.players[1] : this.players[0];
    updateData();
    if (this.currentPlayer.hp <= 0 || this.opponent.hp <= 0) {
        this.loser = this.currentPlayer.hp === 0 ? this.players[0] : this.players[1];
        this.winner = this.currentPlayer.hp === 0 ? this.players[1] : this.players[0];
        endGame();
    } else {
        if (this.round == 1) {
            this.opponent.attack = true;
            fightRound();
        } else if (this.round > 1) {
            this.hasClicked = false;
            getOpponentStrategy();
        };
    }
};

fightRound = () => {
    if (this.opponent.attack == true) {
        $("#point").append(this.opponent.name + " has chosen to attack back!" + '<br>');
        var prev = this.opponent.hp;
        this.opponent.hp -= this.currentPlayer.damage;
        this.points = prev - this.opponent.hp;
        console.log(this.points);
        showDamage(this.currentPlayer);
        $("#feed").append(this.currentPlayer.name + `'s made a crushing damage of ` + this.currentPlayer.damage + " on " + this.opponent.name + '<br>');
        fight(this.opponent);
    } else if (this.opponent.attack == false) {
        $("#point").append(this.opponent.name + " has chosen defense" + '<br>');
        var prev = this.opponent.hp;
        this.opponent.hp -= (this.currentPlayer.damage) / 2;
        this.points = prev - this.opponent.hp;
        console.log(this.points);
        showDamage(this.currentPlayer);
        $("#feed").append(this.currentPlayer.name + `'s made a crushing damage of ` + this.currentPlayer.damage + " on " + this.opponent.name + '<br>');
        fight(this.opponent);
    };
};

chooseStrategy = (choice, player) => {
    if (player == this.opponent.position) {
        if (choice == 'attack') {
            this.choice = true;
            this.hasClicked = true;
            getOpponentStrategy();
        } else if (choice == 'defense') {
            this.choice = false;
            this.hasClicked = true;
            getOpponentStrategy();
        };
    };
};

getOpponentStrategy = () => {
    if (this.opponent.position == 0) {
        $(".card_" + this.opponent.position).css("border", "3px solid #FFD23F");
        $("#feed").append(this.opponent.name + ", you have to choose your strategy!" + '<br>');
    } else if (this.opponent.position == 1) {
        $(".card_" + this.opponent.position).css("border", "3px solid #3BCEAC");
        $("#feed").append(this.opponent.name + ", you have to choose your strategy!" + '<br>');
    }
    if (this.hasClicked) {
        empty();
        if (this.choice == false) {
            this.opponent.attack = false;
            $("#feed").append(this.opponent.name + " has chosen defense!" + '<br>');
            fightRound();

        } else if (this.choice == true) {
            this.opponent.attack = true;
            $("#feed").append(this.opponent.name + " has chosen to attack back!" + '<br>');
            fightRound();
        };
    };
};

changeWeapon = (currentPlayer, chosenWeapon) => {
    this.players[currentPlayer].weapon = weapons[chosenWeapon].name;
    this.players[currentPlayer].damage = weapons[chosenWeapon].damage;
    console.log(this.players[currentPlayer].name + "'s weapon is now " + this.players[currentPlayer].weapon)
};

updateData = (currentPlayer) => {
    $(".player1-name").html(this.players[0].name);
    $(".player1-hp").html(this.players[0].hp);
    $(".player1-weapon").html(this.players[0].weapon);
    $(".player1-damage").html(this.players[0].damage);
    $(".player2-name").html(this.players[1].name);
    $(".player2-hp").html(this.players[1].hp);
    $(".player2-weapon").html(this.players[1].weapon);
    $(".player2-damage").html(this.players[1].damage);
    $(".card").css("border", "0 none");
    this.round++;
};

showDamage = (currentPlayer) => {
    $(".hidden" + currentPlayer.position).fadeIn("fast").animate({
        width: "35%"
    });
    $(".damage").append("-" + this.points);
};

empty = () => {
    $(".hidden").fadeOut("fast");
    $(".damage").empty();
}


endGame = () => {
    $("#gameBoard").hide(1000);
    $("#feed").hide();
    $(".restart").hide();
    $("#results").delay(1000).fadeIn(1500);
    document.getElementById('winner').innerHTML = this.winner.name;
    document.getElementById('loser').innerHTML = this.loser.name;
};
