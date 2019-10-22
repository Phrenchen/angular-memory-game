import { Action } from '@ngrx/store';
import { MatchConfig } from '../model/MatchConfig';
import { MemoryCard } from '../model/MemoryCard';

export const CREATE_MATCH = '[MATCH] Create';
export const GAME_TICK = '[MATCH] Game Tick';
export const SET_NEXT_PLAYER = '[MATCH] set next player';
export const SELECTED_CARD = '[MATCH] selected card';
export const ACTIVE_PLAYER_WINS_PAIR = '[MATCH] active player wins pair';

export const GAME_OVER = '[MATCH] Game Over';

export class CreateMatch implements Action {
    readonly type = CREATE_MATCH;

    // player count
    constructor(public payload: number) {}
}

export class GameTick implements Action {
    readonly type = GAME_TICK;

    constructor() {}
}

export class SelectedCard implements Action {
    readonly type = SELECTED_CARD;

    constructor(public payload: MemoryCard) {}
}

export class GameOver implements Action {
    readonly type = GAME_OVER;

    constructor(public payload: MatchConfig[]) {}
}

export type Actions = 
    CreateMatch |
    GameOver |
    SelectedCard |
    GameTick;
