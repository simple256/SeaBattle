class PlayingGame {
    constructor(PlayerName) {
        this.player = new Player(PlayerName);
        this.computer = new Player("Computer");
        this.endGame = false;
        this.winner = undefined;
    }

    // Ход игрока player на игровое поле противника rival по координате coord
    // Возвращает статус после хода убит/ранен/выстрел мимо/конец игры с выигрышем
    turn = function (player, rival, coord) {
        var result = rival.field.fire(coord);
        switch (result.status) {
            case 'died':
                player.enemyField.setShip(result.ship.shipCoordinates, 3, 4, false);
                player.enemyField.killShip(result.ship.shipLen);
                break;
            case 'hurted':
                player.enemyField.set(coord, 2);
                player.enemyField.setHurtedSurroundingArea(coord);
                break;
            case 'empty':
                player.enemyField.set(coord, 5);
                break;
            case 'endgame':
                player.enemyField.set(coord, 2);
                player.enemyField.killShip(result.ship.shipLen);
                this.endGame = true;
                this.winner = player.name;
                break;
            default:
                break;
        }
        return result.status;
    }
}