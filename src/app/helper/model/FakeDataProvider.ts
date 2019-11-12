import { CardSelectedEvent } from 'src/app/model/CardSelectedEvent';
import { MathHelper } from '../MathHelper';

/**
 * static service providing dummy data:
 * 
 */
export class FakeDataProvider {
    public static createChoices(amount: number = 4): CardSelectedEvent[] {
        const choices: CardSelectedEvent[] = [];

        for(let i=0; i< amount; i++) {
            const isMatch = MathHelper.coinFlip;

            choices.push(
                {
                    occuredAt: new Date(MathHelper.getRandomInt(100, 36000)),
                    selectedCard: null,
                    isFirstSelectedCard: MathHelper.coinFlip,
                    isSelected: MathHelper.coinFlip,
                    isMatch: isMatch,
                    isGameOver: isMatch && MathHelper.coinFlip
                }
            );
        }

        return choices;
    }
}
