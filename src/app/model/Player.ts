import { EventEmitter } from '@angular/core';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { MemoryCard } from './MemoryCard';
import { MatchConfig } from './MatchConfig';
import { CardSelectedEvent } from './CardSelectedEvent';

export class Player { 
    public id: number;      // starts with 1
    public static playerCounter = 0;

    public name = '';
    public isHuman = false;
    public pairsWon = 0;
    public matchActiveTime = 0;
    public avatarUrl = '';

    public choices: CardSelectedEvent[] = [];

    constructor() {
        this.id = ++Player.playerCounter;
    }

    public playTime: PlayTime = {
        turnStart: new Date(),
        turnEnd: new Date(),
        totalTime: 0
    };

    public status(): string {
        return '';
    }

    public play(store: Store<AppState>, matchConfig: MatchConfig): void {
        // do nothing. user will play
    }

    stop() {
        
    }

    public totalTime(): number {
        const tt = Math.floor((this.playTime.turnEnd.getTime() - this.playTime.turnStart.getTime()) / 1000);

        if (this.name === 'Spieler') {
            // console.log(this.name + ': ' + tt + ':: ' + this.playTime.totalTime);

        }
        return Math.round(this.playTime.totalTime / 1000);  // seconds
    }
}

export interface PlayTime {
    turnStart: Date;
    turnEnd: Date;

    totalTime: number;
}
