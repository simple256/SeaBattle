import Ship from "./Ship";

// Игровое поле
class Field {
    // Размерность игрового поля
    N = 10;
    // Максимальная длина корабля
    shipMaxLen = 4;
    // Игровое поле (двумерный массив)
    field = [];

    /*  *** Описание типов, хранимых в игровом поле field ***
        0 - пустая ячейка
        1 - занятая целой частью корабля/целым кораблем
        2 - корабль подбит
        3 - ячейка с убитым кораблем
        4 - ячейка, находящаяся рядом с кораблем
        5 - попадание в пустую область
    */

    // Корабли
    ships = [];

    // Функция для поиска подходящих мест для размещения корабля длиной shipLen
    emptyPlaces = function (shipLen) {
        var places = [];
        var tempPlaceI, tempPlaceJ;
        for (var i = 0; i < this.N; i++) {
            for (var k = 0; k < this.N - shipLen + 1; k++) {
                tempPlaceI = [];
                tempPlaceJ = [];
                for (var j = k; j < k + shipLen; j++) {
                    if ((tempPlaceI === undefined &&
                        tempPlaceJ === undefined))
                        break;
                    if (this.field[i][j] !== 0)
                        tempPlaceI = undefined;
                    if (tempPlaceI !== undefined)
                        tempPlaceI.push({
                            i: i,
                            j: j
                        });
                    if (this.field[j][i] !== 0)
                        tempPlaceJ = undefined;
                    if (tempPlaceJ !== undefined)
                        tempPlaceJ.push({
                            i: j,
                            j: i
                        });
                }
                if (tempPlaceI !== undefined)
                    places.push(tempPlaceI);
                if (tempPlaceJ !== undefined)
                    places.push(tempPlaceJ);
            }
        }
        return places;
    }

    // Случайное размещение кораблей на игровом поле c максимальной длиной корабля shipMaxLen
    randomAllocation = function () {
        for (var i = this.shipMaxLen; i > 0; i--)
            for (var j = 0; j < this.shipMaxLen - (i + 1); j++) {
                var places = this.emptyPlaces(i);
                this.setShip(this.choosePlace(places));
            }
    }

    choosePlace = function (places) {
        if (places.length === 0) {
            throw "Нет свободных мест";
        }
        return places[Math.floor(Math.random() * places.length)];
    }

    // Установка пустой области для подбитого корабля
    setHurtedSurroundingArea = function (coord) {
        var surroundValue = 4;
        if (coord.j > 0 &&
            coord.i > 0 &&
            this.field[coord.i - 1][coord.j - 1] === 0)
            this.field[coord.i - 1][coord.j - 1] = surroundValue;
        if (coord.j > 0 &&
            coord.i < this.N - 1 &&
            this.field[coord.i + 1][coord.j - 1] === 0)
            this.field[coord.i + 1][coord.j - 1] = surroundValue;

        if (coord.j < this.N - 1 &&
            coord.i < this.N - 1 &&
            this.field[coord.i + 1][coord.j + 1] === 0)
            this.field[coord.i + 1][coord.j + 1] = surroundValue;
        if (coord.j < this.N - 1 &&
            coord.i > 0 &&
            this.field[coord.i - 1][coord.j + 1] === 0)
            this.field[coord.i - 1][coord.j + 1] = surroundValue;
    }

    setCoordAndSurroundingArea = function (coord, coordValue, surroundValue) {
        this.field[coord.i][coord.j] = coordValue;
        if (coord.i > 0 &&
            this.field[coord.i - 1][coord.j] !== coordValue &&
            this.field[coord.i - 1][coord.j] !== surroundValue)
            this.field[coord.i - 1][coord.j] = surroundValue;
        if (coord.i < this.N - 1 &&
            this.field[coord.i + 1][coord.j] !== coordValue &&
            this.field[coord.i + 1][coord.j] !== surroundValue)
            this.field[coord.i + 1][coord.j] = surroundValue;
        if (coord.j > 0 &&
            this.field[coord.i][coord.j - 1] !== coordValue &&
            this.field[coord.i][coord.j - 1] !== surroundValue)
            this.field[coord.i][coord.j - 1] = surroundValue;
        if (coord.j < this.N - 1 &&
            this.field[coord.i][coord.j + 1] !== coordValue &&
            this.field[coord.i][coord.j + 1] !== surroundValue)
            this.field[coord.i][coord.j + 1] = surroundValue;

        if (coord.j > 0 &&
            coord.i > 0 &&
            this.field[coord.i - 1][coord.j - 1] !== coordValue &&
            this.field[coord.i - 1][coord.j - 1] !== surroundValue)
            this.field[coord.i - 1][coord.j - 1] = surroundValue;
        if (coord.j > 0 &&
            coord.i < this.N - 1 &&
            this.field[coord.i + 1][coord.j - 1] !== coordValue &&
            this.field[coord.i + 1][coord.j - 1] !== surroundValue)
            this.field[coord.i + 1][coord.j - 1] = surroundValue;

        if (coord.j < this.N - 1 &&
            coord.i < this.N - 1 &&
            this.field[coord.i + 1][coord.j + 1] !== coordValue &&
            this.field[coord.i + 1][coord.j + 1] !== surroundValue)
            this.field[coord.i + 1][coord.j + 1] = surroundValue;
        if (coord.j < this.N - 1 &&
            coord.i > 0 &&
            this.field[coord.i - 1][coord.j + 1] !== coordValue &&
            this.field[coord.i - 1][coord.j + 1] !== surroundValue)
            this.field[coord.i - 1][coord.j + 1] = surroundValue;
    }

    setShip = function (place) {
        place.forEach(coord => {
            this.setCoordAndSurroundingArea(coord, 1, 4);
        });
        var ship = new Ship(place);
        this.ships.push(ship);
    }

    constructor() {
        this.create();
    }
}

Field.prototype.create = function () {
    for (var i = 0; i < this.N; i++) {
        this.field[i] = [];
        for (var j = 0; j < this.N; j++) {
            this.field[i][j] = 0;
        }
    }
}

Field.prototype.fire = function (coord) {
    var status;
    /*  *** Описание результатов выстрела ***
        died - корабль gолностью выведен из строя
        hurted - корабль подбит
        empty - попадание мимо
        endgame - конец игры
    */
    if (this.field[coord.i][coord.j] === 1) {
        for (var i = 0; i < this.ships.length; i++)
            if (this.ships[i].containCoordinate(coord)) {
                this.ships[i].hurted();
                this.field[coord.i][coord.j] = 2;
                status = this.ships[i].checkStatus();

                if (this.ship.filter(elem =>
                    elem.checkStatus() !== "died"
                ).length === 0)
                    status = "endgame";
                return status;
            }
    } else {
        status = "empty";
        return status;
    }
}

// Field.prototype.set = function (coord, type) {
//     if (type > -1 && type < 6)
//         this.field[coord.i][coord.j] = type;
//     else
//         throw "Неверно указан тип для присваимаемого значения поля";
// }

// Field.prototype.check = function (coord) {
//     return this.field[coord.i][coord.j];
// }


