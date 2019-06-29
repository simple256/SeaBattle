// import Field from "./Field";

class Player {
    field;
    enemyField;
    name; 

    constructor(playerName){
        this.name = playerName;

        this.field = new Field();
        this.field.create();
        this.field.randomAllocation();

        this.enemyField = new Field();
        this.enemyField.create();
    }
}

Player.prototype.turn = function() {};