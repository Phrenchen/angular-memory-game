import { Player } from './Player';

export class AiPlayer extends Player {
    
    constructor() {
        super();

        this.name = 'Computer';
        this.isHuman = false;
        this.pairsWon = 0;
        this.matchActiveTime = 0;
        this.avatarUrl = '';
    }
}
