import { Action } from '@ngrx/store';
import { MatchConfig } from '../model/MatchConfig';
import * as MatchActions from './../actions/match.actions';
import { GameService } from '../services/game.service';
import { GameConsts } from '../model/GameConsts';
import { MemoryCard, MemoryCardState } from '../model/MemoryCard';
import { MathHelper } from '../helper/MathHelper';

const gridX = 2;
const gridY = 2;

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
        case MatchActions.SET_NEXT_PLAYER:
            // end current player´s turn
            const currentPlayer = GameService.activePlayer(state.players, state.activePlayer);
            currentPlayer.playTime.turnEnd = new Date();
            currentPlayer.playTime.totalTime += currentPlayer.playTime.turnEnd.getTime() - 
                                                    currentPlayer.playTime.turnStart.getTime();

            // switch active player
            const newState = { ...state, activePlayer: (state.activePlayer + 1) % 2 };
            
            // start next player´s turn
            const nextPlayer = GameService.activePlayer(newState.players, newState.activePlayer);
            nextPlayer.playTime.turnStart = new Date();
            nextPlayer.playTime.turnEnd = new Date();
            // activate turn. enabling user input for human players and starting wait for AI (to randomly select a card)
            // apply strategy on player
            // activePlayer.play();

            return newState;
        case MatchActions.SET_FIRST_SELECTED_CARD:
            return { ...state, firstSelectedCard: action.payload};
        case MatchActions.ACTIVE_PLAYER_WINS_PAIR:
            const localPlayers = state.players.slice();         // clone player array (shallow copy)
            localPlayers[state.activePlayer].pairsWon++;
            const isGameOver = state.cards.length / 2 <= (state.players[0].pairsWon + state.players[1].pairsWon);

            if(isGameOver) {
                localPlayers[state.activePlayer].playTime.turnEnd = new Date();
            }

            return {
                ...state,
                players: localPlayers,
                isGameOver: isGameOver
            };

        default:
            // console.log(state, action);
            return state;
    }
}

