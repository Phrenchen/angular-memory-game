import { Action } from '@ngrx/store';
import { MatchConfig } from '../model/MatchConfig';
import { Player } from '../model/Player';

export const CREATE_MATCH = '[MATCH] Create';
export const SET_NEXT_PLAYER = '[MATCH] set next player';
export const ACTIVE_PLAYER_WINS_PAIR = '[MATCH] active player wins pair';


export const GAME_OVER = '[MATCH] Game Over';
// export const SET_HUMAN_PLAYER_COUNT = '[MATCH] set human player count';
// export const ADD_PLAYERS = '[MATCH] add players';

export class CreateMatch implements Action {
    readonly type = CREATE_MATCH;

    // player count
    constructor(public payload: number) {}
}

export class SetNextPlayer implements Action {
    readonly type = SET_NEXT_PLAYER;

    // reducer will calculate next player. no payload
    constructor() {

    }
}

export class ActivePlayerWinsPair implements Action {
    readonly type = ACTIVE_PLAYER_WINS_PAIR;
}


export class GameOver implements Action {
    readonly type = GAME_OVER;

    constructor(public payload: MatchConfig[]) {}
}

// export class SetHumanPlayerCount implements Action {
//     readonly type = SET_HUMAN_PLAYER_COUNT;

//     constructor(public payload: number) {}
// }

// export class AddPlayers implements Action {
//     readonly type = ADD_PLAYERS;

//     constructor(public payload: Player[]) {}
// }

export type Actions = CreateMatch | GameOver | SetNextPlayer | ActivePlayerWinsPair; // | SetHumanPlayerCount | AddPlayers;
