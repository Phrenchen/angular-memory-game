import { HumanPlayer } from '../model/HumanPlayer';
import { MemoryCard, MemoryCardState } from '../model/MemoryCard';
import { MathHelper } from '../helper/MathHelper';
import { AiPlayer } from '../model/AiPlayer';
import { IPlayer } from '../model/IPlayer';

// Static service class / helper
export class GameService {

  constructor() { }

  public static getCoveredCardIds(cards: MemoryCard[]): number[] {
    const cardIds: number[] = [];

    cards.forEach((card, index) => {
      if (card.state === MemoryCardState.COVERED) {
        cardIds.push(index);
      }
    });

    return cardIds;
  }

  public static activePlayer(players: IPlayer[], activePlayer: number): IPlayer {
    if (activePlayer >= 0 && activePlayer < players.length) {
      return players[activePlayer];
    }
    return null;
  }

  public static createPlayers(humanPlayerCount: number, totalPlayerCount: number): IPlayer[] {
    const players: IPlayer[] = [];
    const aiPlayerCount = Math.max(0, totalPlayerCount - humanPlayerCount);
    let player: IPlayer;

    for (let i = 0; i < humanPlayerCount; i++) {
      player = new HumanPlayer();
      players.push(player);
    }

    for (let j = 0; j < aiPlayerCount; j++) {
      player = new AiPlayer();
      players.push(player);
    }
    return players;
  }

  public static createCards(gridDimensionX: number, gridDimensionY: number, shuffle: boolean): MemoryCard[] {
    let cards = new Array<MemoryCard>();
    let card: MemoryCard;
    const pairs: number[] = GameService.createPairs((gridDimensionX * gridDimensionY) * .5);

    for (let x = 0; x < gridDimensionX; x++) {
      for (let y = 0; y < gridDimensionY; y++) {
        card = new MemoryCard(x, y, pairs.pop());
        cards.push(card);
      }
    }

    if (shuffle) {
      cards = MathHelper.shuffleArray(cards);
    }

    return cards;
  }

  private static createPairs(pairCount: number): Array<number> {
    const pairs = [];

    for (let i = 0; i < pairCount; i++) {
      pairs.push(i);
      pairs.push(i);
    }
    return pairs;
  }
}
