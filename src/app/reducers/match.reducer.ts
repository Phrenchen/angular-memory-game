import { Action } from '@ngrx/store';
import { MatchConfig } from '../model/MatchConfig';
import * as MatchActions from './../actions/match.actions';


const initialState: MatchConfig = {
    humanPlayerCount: 1,
    players: []
};

export function reducer(state: MatchConfig = initialState, action: MatchActions.Actions) {
    // console.log(state, action);


    switch (action.type) {
        case MatchActions.SET_HUMAN_PLAYER_COUNT:
            return {
                humanPlayerCount: action.payload,
                players: state.players
            }
        case MatchActions.CREATE_MATCH:
            // TODO: add players
            

            // return [...state, action.payload];  // clone
            return state;  // clone
            
            default:
            // console.log(state, action);
            return state;
    }
}

