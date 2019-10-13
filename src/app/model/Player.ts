import { IPlayer, PlayTime } from './IPlayer';

export class Player implements IPlayer {
    public name = '';
    public isHuman = false;
    public pairsWon = 0;
    public matchActiveTime = 0;
    public avatarUrl = '';

    public playTime: PlayTime = {
        turnStart: new Date(),
        turnEnd: new Date(),
        totalTime: 0
    };

    public get totalTime(): number {
        const tt = Math.floor( (this.playTime.turnEnd.getTime() - this.playTime.turnStart.getTime() ) / 1000);
        console.log(this.name + ': ' + tt + ':: ' + this.playTime.totalTime);
        return Math.round(this.playTime.totalTime / 1000) + tt;  // seconds
    }
}