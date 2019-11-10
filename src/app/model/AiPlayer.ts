import { Player } from './Player';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as Actions from './../actions/match.actions';
import { MemoryCard, MemoryCardState } from './MemoryCard';
import { MathHelper } from '../helper/MathHelper';
import { MatchConfig } from './MatchConfig';
import { GameService } from '../services/game.service';



export class AiPlayer extends Player {

    private state: TurnStateEnum = TurnStateEnum.firstCard;
    private turnTimeout_1: any;
    private turnTimeout_2: any;

    constructor() {
        super();

        this.name = 'Computer';
        this.isHuman = false;
        this.pairsWon = 0;
        this.matchActiveTime = 0;
        this.avatarUrl = '';
    }

    public stop(): void {
        if (this.turnTimeout_1) {
            console.log('AiPlayer: clearing turn timeout 1');
            clearInterval(this.turnTimeout_1);
            this.turnTimeout_1 = null;
        }

        if (this.turnTimeout_2) {
            console.log('AiPlayer: clearing turn timeout 2');
            clearInterval(this.turnTimeout_2);
            this.turnTimeout_2 = null;
        }
    }

    public play(store: Store<AppState>, matchConfig: MatchConfig): void {
        super.play(store, matchConfig);

        const delayMsFirstCard = 1000;
        const delayMsSecondCard = 2000;

        console.log('*** calling AI to play ***');
        this.state = TurnStateEnum.firstCard;

        // TODO: horrible! try async & await?
        this.turnTimeout_1 = setTimeout(() => {
            console.log('play first card');
            let firstCardIndex = MathHelper.getRandomInt(0, matchConfig.cards.length - 1);
            const coveredCardIds: number[] = GameService.getCoveredCardIds(matchConfig.cards);
            let secondCardIndex = MathHelper.getRandomIntFrom(0, matchConfig.cards.length - 1, coveredCardIds);

            if (!matchConfig.cards[secondCardIndex]) {
                console.log('AiPlayer: no second card at position: ' + secondCardIndex);
                return;
            }

            if (matchConfig.cards[secondCardIndex].state !== MemoryCardState.COVERED) {
                console.log('AiPlayer: wants to see an unavailable card: ', coveredCardIds, secondCardIndex);
            }

            let firstCard = matchConfig.cards[firstCardIndex];
            let secondCard = matchConfig.cards[secondCardIndex];

            setTimeout(() => {
                console.log('first card id: ' + firstCardIndex);
                this.state = TurnStateEnum.secondCard;
                store.dispatch(new Actions.SelectedCard(firstCard));
            });


            this. turnTimeout_2 = setTimeout(() => {
                setTimeout(() => {
                    console.log('play second card', secondCardIndex);
                    store.dispatch(new Actions.SelectedCard(secondCard));
                });

            }, delayMsSecondCard);
        }, delayMsFirstCard);
    }

    public status(): string {
        super.status();
        console.log('this.state_ ', this.state);
        return this.state === TurnStateEnum.firstCard ?
            'Computer selecting first card...' :
            'Computer selecting second card...';
    }
}

export enum TurnStateEnum {
    firstCard,
    secondCard
}