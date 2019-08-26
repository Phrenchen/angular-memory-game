import { Action } from '@ngrx/store';
import { MatchConfig } from '../model/MatchConfig';
import { Player } from '../model/Player';

export const CREATE_MATCH = '[MATCH] Create';
export const GAME_OVER = '[MATCH] Game Over';
// export const SET_HUMAN_PLAYER_COUNT = '[MATCH] set human player count';
// export const ADD_PLAYERS = '[MATCH] add players';

export class CreateMatch implements Action {
    readonly type = CREATE_MATCH;

    // player count
    constructor(public payload: number) {}
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

export type Actions = CreateMatch | GameOver; // | SetHumanPlayerCount | AddPlayers;
