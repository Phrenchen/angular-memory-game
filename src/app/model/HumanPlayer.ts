import { Player } from './Player';

export class HumanPlayer implements Player {
    public name = 'Spieler';
    public isHuman = true;
    public pairsWon = 0;
    public avatarUrl = '';

}
