import Field from './Field';

class Player {
    field = Field();
    enemyField = Field();
}

Player.prototype.turn = function() {};