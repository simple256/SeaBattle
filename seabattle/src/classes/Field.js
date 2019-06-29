// Игровое поле
class Field {
    // Размерность игрового поля
    N = 10;
    // Игровое поле (двумерный массив)
    field;
    /*  *** Описание типов, хранимых в игровом поле ***
        0 - пустая ячейка
        1 - занятая целой частью корабля/целым кораблем
        2 - корабль подбит
        3 - ячейка с убитым кораблем
        4 - ячейка, находящаяся рядом с убитым кораблем
    */

    randomPlace = function (shipLen) {
        places = [];
        for (var i=0; i<this.N - shipLen; i++)
            for (var j=0; j<this.N; j++)
                if (this.field[i][j])
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
        throw FieldExeption("Неверно указан тип для присваимаемого значения поля");
}

Field.prototype.check = function (i, j) {
    return this.field[i][j];
}

function FieldExeption(mess) {
    this.message = mess;
    this.name = "Ошибка класса Field";
}