class Ship {
    shipLen;
    shipCoordinates;
    hurt;

    // Проверка статуса корабля
    checkStatus = function () {
        if (this.hurt === 0)
            return "live";
        else if (this.hurt === this.shipLen) {
            return "died";
        }
        else if (this.hurt > 0 &&
            this.hurt < this.shipLen) {
            return "hurted";
        }
    }

    constructor(places) {
        this.shipLen = places.length;
        this.hurt = 0;
        this.shipCoordinates = [];
        places.forEach(elem => {
            this.shipCoordinates.push({ i: elem.i, j: elem.j });
        });
    }

    // Проверка соответствия координаты к кораблю
    containCoordinate = function (coord) {
        return this.shipCoordinates.filter(elem => elem.i === coord.i &&
            elem.j === coord.j).length > 0
    }

    // Попадание в корабль
    hurted = function () {
        this.hurt++;
    }
}