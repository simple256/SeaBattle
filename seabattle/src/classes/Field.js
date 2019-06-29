// Игровое поле
class Field {
    // Размерность игрового поля
    N = 10;
    // Игровое поле (двумерный массив)
    field = [];
    /*  *** Описание типов, хранимых в игровом поле ***
        0 - пустая ячейка
        1 - занятая целой частью корабля/целым кораблем
        2 - корабль подбит
        3 - ячейка с убитым кораблем
        4 - ячейка, находящаяся рядом с кораблем
    */

    emptyPlaces = function (shipLen) {
        var places = [];
        var tempPlaceI, tempPlaceJ;
        for (var i = 0; i < this.N; i++) {
            for (var k = 0; k < this.N - shipLen + 1; k++) {
                tempPlaceI = [];
                tempPlaceJ = [];
                for (var j = k; j < k + shipLen; j++) {
                    if ((tempPlaceI === undefined && tempPlaceJ === undefined))
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

    choosePlace = function (places) {
        if (places.length === 0)
            throw "Нет свободных мест";
        return places[Math.floor(Math.random() * places.length)];
    }

    // Math.floor(Math.random() * r.length);

    setShip = function (place) {
        place.forEach(elem => {
            this.field[elem.i][elem.j] = 1;
            if (elem.i > 0 && this.field[elem.i - 1][elem.j] === 0)
                this.field[elem.i - 1][elem.j] = 4;
            if (elem.i < this.N - 1 && this.field[elem.i + 1][elem.j] === 0)
                this.field[elem.i + 1][elem.j] = 4;
            if (elem.j > 0 && this.field[elem.i][elem.j - 1] === 0)
                this.field[elem.i][elem.j - 1] = 4;
            if (elem.j < this.N - 1 && this.field[elem.i][elem.j + 1] === 0)
                this.field[elem.i][elem.j + 1] = 4;

            if (elem.j > 0 && elem.i > 0 && this.field[elem.i - 1][elem.j - 1] === 0)
                this.field[elem.i - 1][elem.j - 1] = 4;
            if (elem.j > 0 && elem.i < this.N - 1 && this.field[elem.i + 1][elem.j - 1] === 0)
            this.field[elem.i + 1][elem.j - 1] = 4;

            if (elem.j < this.N - 1 && elem.i < this.N - 1 && this.field[elem.i + 1][elem.j + 1] === 0)
                this.field[elem.i + 1][elem.j + 1] = 4;
            if (elem.j < this.N - 1 && elem.i > 0 && this.field[elem.i - 1][elem.j + 1] === 0)
                this.field[elem.i - 1][elem.j + 1] = 4;
        });
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

Field.prototype.set = function (i, j, type) {
    if (type > -1 && type < 5)
        this.field[i][j] = type;
    else
        throw "Неверно указан тип для присваимаемого значения поля";
}

Field.prototype.check = function (i, j) {
    return this.field[i][j];
}