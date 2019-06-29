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

    // Убивает корабль (для случая поля противника)
    killShip = function (shipLength) {
        for (var i = 0; i < this.ships.length; i++) {
            if (this.ships[i].shipLen === shipLength && this.ships[i].status !== "died") {
                this.ships[i].status = "died";
                break;
            }
        }
    }

    // Случайное размещение кораблей на игровом поле c максимальной длиной корабля shipMaxLen
    randomAllocation = function () {
        var count = 1;
        for (var i = this.shipMaxLen; i > 0; i--) {
            for (var j = 0; j < count; j++) {
                var places = this.emptyPlaces(i);
                this.setShip(this.choosePlace(places));
            }
            count++;
        }
    }

    // Выбор случайного места для выстрела
    choosePlace = function (places) {
        if (places.length === 0) {
            throw "Нет свободных мест";
        }
        // Выбор уникальных значений
        places = places.filter((v, i, a) => a.indexOf(v) === i);
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

    // Установка значения coordValue координаты coord и окружающих точек значениями surroundValue
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

    // Установка корабля в координатах place
    setShip = function (place, placeValue = 1, surroundValue = 4, addShiptoShips = true) {
        place.forEach(coord => {
            this.setCoordAndSurroundingArea(coord, placeValue, surroundValue);
        });
        if (addShiptoShips) {
            var ship = new Ship(place);
            this.ships.push(ship);
        }
    }

    constructor() {
        this.create();
    }
}

// Инициализация пустого игрового поля
Field.prototype.create = function () {
    for (var i = 0; i < this.N; i++) {
        this.field[i] = [];
        for (var j = 0; j < this.N; j++) {
            this.field[i][j] = 0;
        }
    }
}

// Огонь по полю
Field.prototype.fire = function (coord) {
    var result = {};
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
                result.status = this.ships[i].checkStatus();

                if (this.ships.filter(elem =>
                    elem.checkStatus() !== "died").length === 0) {
                    result.ship = this.ships[i];
                    result.status = "endgame";
                    return result;
                }
                if (result.status === "died")
                    result.ship = this.ships[i];
                return result;
            }
    } else {
        result.status = "empty";
        return result;
    }
}

// Поиск возможных выстрелов для подбитой точки
Field.prototype.searchFirePlaces = function (coord) {
    var places = [];

    if (coord.i > 0 &&
        this.field[coord.i - 1][coord.j] === 0)
        places.push({ i: coord.i - 1, j: coord.j })
    if (coord.i < this.N - 1 &&
        this.field[coord.i + 1][coord.j] === 0)
        places.push({ i: coord.i + 1, j: coord.j })
    if (coord.j > 0 &&
        this.field[coord.i][coord.j - 1] === 0)
        places.push({ i: coord.i, j: coord.j - 1 })
    if (coord.j < this.N - 1 &&
        this.field[coord.i][coord.j + 1] === 0)
        places.push({ i: coord.i, j: coord.j + 1 })

    return places;
}

// Установка статуса type для точки coord
Field.prototype.set = function (coord, type) {
    if (type > -1 && type < 6)
        this.field[coord.i][coord.j] = type;
    else
        throw "Неверно указан тип для присваимаемого значения поля";
}