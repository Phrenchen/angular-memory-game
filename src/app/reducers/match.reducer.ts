import { Action } from '@ngrx/store';
import { MatchConfig } from '../model/MatchConfig';
import * as MatchActions from './../actions/match.actions';
import { GameService } from '../services/game.service';
import { GameConsts } from '../model/GameConsts';
import { MemoryCard, MemoryCardState } from '../model/MemoryCard';
import { MathHelper } from '../helper/MathHelper';
import { Player } from '../model/Player';
import { CardSelectedEvent } from '../model/CardSelectedEvent';

const gridX = 2;
const gridY = 2;

const initialState: MatchConfig = {
    matchStartTime: new Date(),
    matchEndTime: new Date(new Date().getTime() + GameConsts.DEFAULT_MATCH_DURATION_MS),
    gridDimensionX: gridX,
    gridDimensionY: gridY,
    humanPlayerCount: 2,
    totalPlayerCount: 2,
    players: GameService.createPlayers(2, 2),
    cards: GameService.createCards(gridX, gridY, true),
    activePlayer: 0,
    firstSelectedCard: null,
    currentPlayerHasPaired: false,
    isGameOver: false,
};

export function reducer(state: MatchConfig = initialState, action: MatchActions.Actions) {
    // console.log(action, state);
    let currentPlayer: Player;

    switch (action.type) {
        case MatchActions.SET_PLAYER_COUNT:
            return {...state, humanPlayerCount: action.payload};
        case MatchActions.CREATE_MATCH:
            let resetCards: MemoryCard[] = state.cards.slice();
            resetCards.forEach(card => {
                card.state = MemoryCardState.COVERED;
            });

            resetCards = MathHelper.shuffleArray(resetCards);

            return {
                ...state,
                matchStartedTime: new Date(),
                activePlayer: 0,
                cards: resetCards,
                humanPlayerCount: action.payload,
                players: GameService.createPlayers(action.payload, GameConsts.TOTAL_PLAYER_COUNT),
                isGameOver: false
            };
        case MatchActions.GAME_TICK:
            if (state.currentPlayerHasPaired) {    // reset "has-won-a-pair" state. )

            }
            // update match time to store
            // requires new Action and update MatchConfig in reducer
            // currentPlayer = GameService.activePlayer(state.players, state.activePlayer);
            // currentPlayer.playTime.totalTime++;
            // currentPlayer.playTime = {...currentPlayer.playTime.to, currentPlayer.playTime.totalTime + 1}
            return state;
        case MatchActions.SELECTED_CARD:
            const selectedCard: MemoryCard = action.payload;
            const newState2 = { ...state };
            selectedCard.toggleSelected();
            currentPlayer = GameService.activePlayer(newState2.players, newState2.activePlayer);

            const choice: CardSelectedEvent = {
                occuredAt: new Date(),
                actorId: currentPlayer.id,
                partnerId: selectedCard.partnerId,
                isFirstSelectedCard: false,     // override later
                isSelected: selectedCard.isSelected,
                isMatch: false,
                isGameOver: false

            };
            
            const choices: CardSelectedEvent[] = currentPlayer.choices.slice();
            const lastChoice: CardSelectedEvent = choices.length > 1 ? choices[choices.length - 2] : null;
            choices.push(choice);
            currentPlayer.choices = choices;

            
            if (selectedCard.isSelected) {
                if (!newState2.firstSelectedCard) {
                    newState2.firstSelectedCard = selectedCard;
                    // compare current card with actor of last action
                    if(!lastChoice) {           
                        choice.isFirstSelectedCard = true;  // first choice of the match is always first card :) looks fishy...
                    }
                    else {
                        choice.isFirstSelectedCard = !newState2.firstSelectedCard || newState2.firstSelectedCard.id === selectedCard.id;

                    }
                }
                else {
                    // 2 cards selected
                    if (newState2.firstSelectedCard.matches(selectedCard)) {
                        // is a match!
                        console.log('is a match!');
                        
                        currentPlayer.pairsWon++;
                        choice.isMatch = true;
                        newState2.firstSelectedCard = null;

                        const isGameOver = (newState2.players[0].pairsWon + newState2.players[1].pairsWon) >= newState2.cards.length / 2;
                        if (isGameOver) {
                            currentPlayer.playTime.turnEnd = new Date();
                            newState2.isGameOver = isGameOver;
                            choice.isGameOver = isGameOver;
                            newState2.matchEndTime = new Date();
                            // console.log('all choice: ', choices);
                        }
                        else {
                            // continue with same player
                            newState2.currentPlayerHasPaired = true;
                        }
                    }
                    else {
                        // no match :(
                        console.log('no match :(');
                        newState2.firstSelectedCard.state = MemoryCardState.COVERED;
                        selectedCard.state = MemoryCardState.COVERED;

                        newState2.firstSelectedCard = null;
                        newState2.activePlayer = (newState2.activePlayer + 1) % 2;

                        const nextPlayer2 = GameService.activePlayer(newState2.players, newState2.activePlayer);
                        nextPlayer2.playTime.turnStart = new Date();
                        nextPlayer2.playTime.turnEnd = new Date();
                    }
                }
            }
            else {
                newState2.firstSelectedCard = null;
            }

            // console.log('choice: ', choice);
            // console.log('choices: ', choices.length);
            return newState2;
        default:
            // console.log(state, action);
            return state;
    }
}

