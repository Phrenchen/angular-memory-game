import { Action } from '@ngrx/store';
import { MatchConfig } from '../model/MatchConfig';
import * as MatchActions from './../actions/match.actions';
import { GameService } from '../services/game.service';
import { GameConsts } from '../model/GameConsts';
import { MemoryCard, MemoryCardState } from '../model/MemoryCard';
import { MathHelper } from '../helper/MathHelper';
import { IPlayer } from '../model/IPlayer';

const gridX = 1;
const gridY = 4;

const initialState: MatchConfig = {
    gridDimensionX: gridX,
    gridDimensionY: gridY,
    humanPlayerCount: 1,
    totalPlayerCount: 2,
    players: GameService.createPlayers(1, 2),
    cards: GameService.createCards(gridX, gridY, true),
    activePlayer: 0,
    firstSelectedCard: null,
    isGameOver: false,
};

export function reducer(state: MatchConfig = initialState, action: MatchActions.Actions) {
    // console.log(action, state);
    let currentPlayer: IPlayer;

    switch (action.type) {
        case MatchActions.CREATE_MATCH:
            let resetCards: MemoryCard[] = state.cards.slice();
            resetCards.forEach(card => {
                card.state = MemoryCardState.COVERED;
            });

            resetCards = MathHelper.shuffleArray(resetCards);

            return {
                ...state,
                humanPlayerCount: action.payload,
                cards: resetCards,
                players: GameService.createPlayers(action.payload, GameConsts.TOTAL_PLAYER_COUNT),
                isGameOver: false
            };
        case MatchActions.GAME_TICK:
            // update match time to store
            // requires new Action and update MatchConfig in reducer
            // currentPlayer = GameService.activePlayer(state.players, state.activePlayer);
            // currentPlayer.playTime.totalTime++;
            // currentPlayer.playTime = {...currentPlayer.playTime.to, currentPlayer.playTime.totalTime + 1}
            return state;
        case MatchActions.SELECTED_CARD:
            const selectedCard: MemoryCard = action.payload;
            const newState2 = { ...state};
            selectedCard.toggleSelected();

            if (selectedCard.isSelected) {
                if (!newState2.firstSelectedCard) {
                    newState2.firstSelectedCard = selectedCard;
                }
                else {
                    // 2 cards selected
                    if(newState2.firstSelectedCard.matches(selectedCard)) {
                        currentPlayer = GameService.activePlayer(newState2.players, newState2.activePlayer);
                        currentPlayer.pairsWon++;

                        newState2.firstSelectedCard = null;
                        
                        const isGameOver = (newState2.players[0].pairsWon + newState2.players[1].pairsWon) >= newState2.cards.length / 2;
                        if(isGameOver) {
                            currentPlayer.playTime.turnEnd = new Date();
                            newState2.isGameOver = isGameOver;
                        }
                    }
                    else {
                        newState2.firstSelectedCard.toggleSelected();
                        selectedCard.toggleSelected();
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

            return newState2;
        default:
            // console.log(state, action);
            return state;
    }
}

