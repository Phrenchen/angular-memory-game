import { Action } from '@ngrx/store';
import { MatchConfig } from '../model/MatchConfig';
import * as MatchActions from './../actions/match.actions';
import { GameService } from '../services/game.service';
import { GameConsts } from '../model/GameConsts';


const initialState: MatchConfig = {
    gridDimensionX: 4,
    gridDimensionY: 4,
    humanPlayerCount: 1,
    totalPlayerCount: 2,
    players: GameService.createPlayers(1, 2),
    cards: GameService.createCards(4, 4)
};

export function reducer(state: MatchConfig = initialState, action: MatchActions.Actions) {
    // console.log(state, action);


    switch (action.type) {
        case MatchActions.CREATE_MATCH:
            // TODO: add players
            return {
                humanPlayerCount: action.payload,
                players: GameService.createPlayers(action.payload, GameConsts.TOTAL_PLAYER_COUNT)
            };

            // return [...state, action.payload];  // clone
            // return state;  // clone

        default:
            // console.log(state, action);
            return state;
    }
}

