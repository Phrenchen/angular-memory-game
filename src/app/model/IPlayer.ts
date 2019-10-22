import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { MatchConfig } from './MatchConfig';

export interface IPlayer {
    name: string;
    isHuman: boolean;
    pairsWon: number;
    

    playTime: PlayTime;    // time spent at player´s turn
    // totalTime: number;
    totalTime(): number;
    play(store: Store<AppState>, matchConfig: MatchConfig): void;
    
    avatarUrl: string;

}

export interface PlayTime {
    turnStart: Date;
    turnEnd: Date;

    totalTime: number;
}