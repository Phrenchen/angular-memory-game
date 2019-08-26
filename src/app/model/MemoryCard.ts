import { ColorConsts } from './ColorConsts';

export enum MemoryCardState {
    COVERED,
    OPEN,
    REMOVED
}

export class MemoryCard {
    private static cardCounter = 0;
    private id: number;

    private colors: Map<MemoryCardState, string> = new Map<MemoryCardState, string>();

    public state: MemoryCardState = MemoryCardState.COVERED;


    constructor(public x: number, public y: number, public partnerId: number) {
        this.id = ++MemoryCard.cardCounter;

        this.colors.set(MemoryCardState.COVERED, 'white');
        this.colors.set(MemoryCardState.OPEN, ColorConsts.cardColors[this.partnerId]);
        this.colors.set(MemoryCardState.REMOVED, 'grey');
    }

    // returns: is selected
    public toggleSelected(): boolean {
        this.state = this.state === MemoryCardState.COVERED ?
            MemoryCardState.OPEN : MemoryCardState.COVERED;

        return this.state === MemoryCardState.OPEN;
    }

    public get color(): string {
        return this.colors.get(this.state);
    }

    public matches(card: MemoryCard): boolean {
        return this.partnerId === card.partnerId;
    }
}
