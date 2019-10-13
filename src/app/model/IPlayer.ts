export interface IPlayer {
    name: string;
    isHuman: boolean;
    pairsWon: number;
    

    playTime: PlayTime;    // time spent at player´s turn
    totalTime: number;
    
    avatarUrl: string;

}

export interface PlayTime {
    turnStart: Date;
    turnEnd: Date;

    totalTime: number;
}