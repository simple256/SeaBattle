class Player {
    constructor(playerName) {
        this.name = playerName;

        this.field = new Field();
        this.field.create();
        this.field.randomAllocation();

        this.enemyField = new Field();
        this.enemyField.create();
        this.enemyField.ships = [];

        this.createEnemyShips();

    }
    createEnemyShips = function () {
        var count = 1;
        for (var i = this.enemyField.shipMaxLen; i > 0; i--) {
            for (var j = 0; j < count; j++) {
                this.enemyField.ships.push(new Ship(null, i));
            }
            count++;
        }
    }
};

// Автоматический поиск хода для компьютера
// Приоритет дает местам, в которых может располагаться корабль наибольшей длины
Player.prototype.autoturn = function () {
    var coord = {};
    var freeSpace = [];
    // Для случая если есть подбитый корабль
    for (var i = 0; i < this.enemyField.N; i++) {
        for (var j = 0; j < this.enemyField.N; j++) {
            if (this.enemyField.field[i][j] === 2) {
                freeSpace = freeSpace.concat(this.enemyField.searchFirePlaces({ i: i, j: j }));
            }
        }
    };
    if (freeSpace.length !== 0) {
        // Выбирает уникальные ходы
        freeSpace = freeSpace.filter((v, i, a) => a.indexOf(v) === i);
        // Случайным образом выбирает из уникальных ходов
        coord = freeSpace[Math.floor(Math.random() * freeSpace.length)];
        // console.log(freeSpace);
        return coord;
    }

    // Поиск свободного места когда подбитых кораблей не обнаружено
    var maxLen = 1;
    for (var s = 0; s < this.enemyField.ships.length; s++) {
        if (this.enemyField.ships[s].shipLen > maxLen && this.enemyField.ships[s].status !== "died")
            maxLen = this.enemyField.ships[s].shipLen;
    }
    var places = this.enemyField.emptyPlaces(maxLen);
    places = places.filter((v, i, a) => a.indexOf(v) === i);
    // console.log(places);
    var place = places[Math.floor(Math.random() * places.length)];
    coord = place[Math.floor(Math.random() * place.length)];
    return coord;
};