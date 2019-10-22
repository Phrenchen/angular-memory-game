import { Player } from './Player';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as Actions from './../actions/match.actions';
import { MemoryCard, MemoryCardState } from './MemoryCard';
import { MathHelper } from '../helper/MathHelper';
import { MatchConfig } from './MatchConfig';

export class AiPlayer extends Player {


    constructor() {
        super();

        this.name = 'Computer';
        this.isHuman = false;
        this.pairsWon = 0;
        this.matchActiveTime = 0;
        this.avatarUrl = '';
    }

    public play(store: Store<AppState>, matchConfig: MatchConfig): void {
        super.play(store, matchConfig);

        const delayMsFirstCard = 1000;
        const delayMsSecondCard = 2000;

        // TODO: horrible! try async & await?
        // setTimeout(() => {
        //     console.log('play first card');
        //     let firstCardIndex = MathHelper.getRandomInt(0, matchConfig.cards.length - 1);
        //     let secondCardIndex = MathHelper.getRandomInt(0, matchConfig.cards.length - 1);
        //     let firstCard = matchConfig.cards[firstCardIndex];
        //     let secondCard = matchConfig.cards[secondCardIndex];

        //     console.log('first card id: ' + firstCardIndex);
        //     console.log('first card: ', firstCard);
        //     console.log('second card id: ' + secondCardIndex);
        //     console.log('second card: ', secondCard);



        //     store.dispatch(new Actions.SelectedCard(firstCard));

        //     setTimeout(() => {
        //         console.log('play second card');

        //         if (matchConfig.firstSelectedCard) {
        //             // selectedCardIndex++;
        //             if (matchConfig.firstSelectedCard.matches(firstCard)) {
        //                 store.dispatch(new Actions.ActivePlayerWinsPair());
        //                 store.dispatch(new Actions.SelectedCard(null));
        //             }
        //             else {
        //                 store.dispatch(new Actions.SelectedCard(null));
        //             }
        //         }
        //         else {
        //             console.log('wtf no first card?', matchConfig);
        //         }
        //     }, delayMsSecondCard);

        // }, delayMsFirstCard);
    }
}
