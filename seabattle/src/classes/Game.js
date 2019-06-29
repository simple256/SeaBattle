class Game {
    constructor(PlayerName) {
        this.player = new Player(PlayerName);
        this.computer = new Player("Computer");
        this.endGame = false;
        this.winner = undefined;
    }

    turn = function (player, rival, coord) {
        var result = rival.field.fire(coord);
        console.log(result);
        switch (result.status) {
            case 'died':
                player.enemyField.setShip(result.shipCoords, 3, 4);
                break;
            case 'hurted':
                player.enemyField.set(coord, 2);
                player.enemyField.setHurtedSurroundingArea(coord);
                break;
            case 'empty':
                player.enemyField.set(coord, 5);
                break;
            case 'endgame':
                player.enemyField.setShip(result.shipCoords, 3, 4);
                this.endGame = true;
                this.winner = player.name;
                break;
            default:
                break;
        }
    }
}