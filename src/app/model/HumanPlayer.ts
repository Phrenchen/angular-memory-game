import { Player } from './Player';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { MatchConfig } from './MatchConfig';

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

    public play(store: Store<AppState>, matchConfig: MatchConfig): void {
        // console.log('play human turn');
        super.play(store, matchConfig);
    }

    public stop(): void {
        // console.log('stopping human turn');
    }
}
