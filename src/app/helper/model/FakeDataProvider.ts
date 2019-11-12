import { CardSelectedEvent } from 'src/app/model/CardSelectedEvent';
import { MathHelper } from '../MathHelper';

/**
 * static service providing dummy data:
 * 
 */
export class FakeDataProvider {


    public static createRandomChoices(amount: number = 4): CardSelectedEvent[] {
        const choices: CardSelectedEvent[] = [];

        for (let i = 0; i < amount; i++) {
            const isMatch = MathHelper.coinFlip;

            choices.push(
                {
                    occuredAt: new Date(MathHelper.getRandomInt(100, 36000)),
                    actorId: MathHelper.getRandomInt(1, 2),
                    partnerId: MathHelper.getRandomInt(1, 6),
                    isFirstSelectedCard: MathHelper.coinFlip,
                    isSelected: MathHelper.coinFlip,
                    isMatch: isMatch,
                    isGameOver: isMatch && MathHelper.coinFlip
                }
            );
        }

        return choices;
    }


    public static getRealMatch(): CardSelectedEvent[] {
        return FakeDataProvider.firstPlayerChoices.concat(FakeDataProvider.secondPlayerChoices);
    }

    // PRIVATE
    private static firstPlayerChoices = [
        {
          'occuredAt': new Date('2019-11-12T22:14:20.933Z'),
          'actorId': 3,
          'partnerId': 2,
          'isFirstSelectedCard': true,
          'isSelected': true,
          'isMatch': false,
          'isGameOver': false
        },
        {
          'occuredAt': new Date('2019-11-12T22:14:21.745Z'),
          'actorId': 3,
          'partnerId': 3,
          'isFirstSelectedCard': false,
          'isSelected': true,
          'isMatch': false,
          'isGameOver': false
        },
        {
          'occuredAt': new Date('2019-11-12T22:14:28.478Z'),
          'actorId': 3,
          'partnerId': 4,
          'isFirstSelectedCard': true,
          'isSelected': true,
          'isMatch': false,
          'isGameOver': false
        },
        {
          'occuredAt': new Date('2019-11-12T22:14:28.896Z'),
          'actorId': 3,
          'partnerId': 4,
          'isFirstSelectedCard': false,
          'isSelected': true,
          'isMatch': true,
          'isGameOver': false
        },
        {
          'occuredAt': new Date('2019-11-12T22:14:29.296Z'),
          'actorId': 3,
          'partnerId': 5,
          'isFirstSelectedCard': true,
          'isSelected': true,
          'isMatch': false,
          'isGameOver': false
        },
        {
          'occuredAt': new Date('2019-11-12T22:14:29.748Z'),
          'actorId': 3,
          'partnerId': 5,
          'isFirstSelectedCard': false,
          'isSelected': true,
          'isMatch': true,
          'isGameOver': false
        },
        {
          'occuredAt': new Date('2019-11-12T22:14:30.261Z'),
          'actorId': 3,
          'partnerId': 1,
          'isFirstSelectedCard': true,
          'isSelected': true,
          'isMatch': false,
          'isGameOver': false
        },
        {
          'occuredAt': new Date('2019-11-12T22:14:30.864Z'),
          'actorId': 3,
          'partnerId': 1,
          'isFirstSelectedCard': false,
          'isSelected': true,
          'isMatch': true,
          'isGameOver': true
        }
      ];

      private static secondPlayerChoices = [
        {
          'occuredAt': new Date('1970-01-01T00:00:09.108Z'),
          'actorId': 1,
          'partnerId': 4,
          'isFirstSelectedCard': true,
          'isSelected': true,
          'isMatch': true,
          'isGameOver': true
        },
        {
          'occuredAt': new Date('1970-01-01T00:00:15.522Z'),
          'actorId': 2,
          'partnerId': 2,
          'isFirstSelectedCard': true,
          'isSelected': true,
          'isMatch': false,
          'isGameOver': false
        },
        {
          'occuredAt': new Date('1970-01-01T00:00:18.594Z'),
          'actorId': 1,
          'partnerId': 1,
          'isFirstSelectedCard': true,
          'isSelected': false,
          'isMatch': false,
          'isGameOver': false
        },
        {
          'occuredAt': new Date('1970-01-01T00:00:21.587Z'),
          'actorId': 1,
          'partnerId': 3,
          'isFirstSelectedCard': true,
          'isSelected': true,
          'isMatch': true,
          'isGameOver': false
        }
      ];
}
