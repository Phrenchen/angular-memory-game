import { MemoryCard } from './MemoryCard';

/**
 * provides information to describe when happend what during the game to add some stats
 * - time of event. format: mm:ss:SS (01:35:123, add leading zeros)
 */
export interface CardSelectedEvent {
    occuredAt: Date;        // time into the match. format: mm:ss:sssZ
    selectedCard: MemoryCard;
    isFirstSelectedCard: boolean;
    isSelected: boolean;    // false if turned back to covered state
    isMatch: boolean;
    isGameOver: boolean;
}
