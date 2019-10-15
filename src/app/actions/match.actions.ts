import { Action } from '@ngrx/store';
import { MatchConfig } from '../model/MatchConfig';
import { MemoryCard } from '../model/MemoryCard';

export const CREATE_MATCH = '[MATCH] Create';
export const GAME_TICK = '[MATCH] Game Tick';
export const SET_NEXT_PLAYER = '[MATCH] set next player';
export const SET_FIRST_SELECTED_CARD = '[MATCH] set first selected card';
export const ACTIVE_PLAYER_WINS_PAIR = '[MATCH] active player wins pair';

export const GAME_OVER = '[MATCH] Game Over';

// export const SET_HUMAN_PLAYER_COUNT = '[MATCH] set human player count';
// export const ADD_PLAYERS = '[MATCH] add players';

export class CreateMatch implements Action {
    readonly type = CREATE_MATCH;

    // player count
    constructor(public payload: number) {}
}

export class GameTick implements Action {
    readonly type = GAME_TICK;

    constructor() {}
}

export class SetNextPlayer implements Action {
    readonly type = SET_NEXT_PLAYER;

    // reducer will calculate next player. no payload
    constructor() {}
}

export class SetFirstSelectedCard implements Action {
    readonly type = SET_FIRST_SELECTED_CARD;

    constructor(public payload: MemoryCard) {}
}

export class ActivePlayerWinsPair implements Action {
    readonly type = ACTIVE_PLAYER_WINS_PAIR;
}


export class GameOver implements Action {
    readonly type = GAME_OVER;

    constructor(public payload: MatchConfig[]) {}
}

export type Actions = 
    CreateMatch |
    GameOver |
    SetNextPlayer |
    ActivePlayerWinsPair |
    SetFirstSelectedCard |
    GameTick;
