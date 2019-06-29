class Ship {
    shipLen;
    shipCoordinates;
    hurt;
    status;

    // Проверка статуса корабля
    checkStatus = function () {
        if (this.hurt === 0)
            this.status = "live";
        else if (this.hurt === this.shipLen) {
            this.status = "died";
        }
        else if (this.hurt > 0 &&
            this.hurt < this.shipLen) {
            this.status = "hurted";
        }
        return this.status;
    }


    constructor(places = null, len = 0) {
        if (places === null) {
            this.shipLen = len;
            this.hurt = 0;
            this.status = "live";
            return;
        }
        this.shipLen = places.length;
        this.hurt = 0;
        this.shipCoordinates = [];
        places.forEach(elem => {
            this.shipCoordinates.push({ i: elem.i, j: elem.j });
        });
        this.status = "live";
    }

    // Проверка соответствия координаты к кораблю
    containCoordinate = function (coord) {
        return this.shipCoordinates.filter(elem => elem.i === coord.i &&
            elem.j === coord.j).length > 0
    }

    // Попадание в корабль
    hurted = function () {
        this.hurt++;
        this.checkStatus();
    }
}