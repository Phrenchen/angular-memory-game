import { Player } from './Player';

export class HumanPlayer extends Player {
    constructor() {
        super();
        
        this.name = 'Spieler';
        this.isHuman = true;
        this.pairsWon = 0;
        this.matchActiveTime = 0;
        this.avatarUrl = '';
    }

    public status(): string {
        super.status();

        return 'Player´s turn. Select 2 matching Cards';
    }
}
