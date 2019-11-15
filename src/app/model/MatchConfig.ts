import { Player } from './Player';
import { MemoryCard } from './MemoryCard';

export interface MatchConfig {
    matchStartTime: Date;
    matchEndTime: Date;
    currentPlayerHasPaired: boolean;    // a card has matched. currentplayer has earned 1 point. 
    gridDimensionX: number;         // contains card count on x- / y-axis
    gridDimensionY: number;         // contains card count on x- / y-axis

    humanPlayerCount: number;
    totalPlayerCount: number;

    players: Player[];
    cards: MemoryCard[];

    activePlayer: number;
    firstSelectedCard: MemoryCard;
    isGameOver: boolean;
}
