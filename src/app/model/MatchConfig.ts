import { IPlayer } from './IPlayer';
import { MemoryCard } from './MemoryCard';

export interface MatchConfig {
    gridDimensionX: number;         // contains card count on x- / y-axis
    gridDimensionY: number;         // contains card count on x- / y-axis

    humanPlayerCount: number;
    totalPlayerCount: number;

    players: IPlayer[];
    cards: MemoryCard[];

    activePlayer: number;
    firstSelectedCard: MemoryCard;
    isGameOver: boolean;
}
