import { Action } from '@ngrx/store';
import { MatchConfig } from '../model/MatchConfig';

export const CREATE_MATCH = '[MATCH] Create';
export const GAME_OVER = '[MATCH] Game Over';
export const SET_HUMAN_PLAYER_COUNT = '[MATCH] set human player count';

export class CreateMatch implements Action {
    readonly type = CREATE_MATCH;

    constructor(public payload: MatchConfig[]) {}
}

export class GameOver implements Action {
    readonly type = GAME_OVER;

    constructor(public payload: MatchConfig[]) {}
}

export class SetHumanPlayerCount implements Action {
    readonly type = SET_HUMAN_PLAYER_COUNT;

    constructor(public payload: number) {}
}

export type Actions = CreateMatch | GameOver | SetHumanPlayerCount;
