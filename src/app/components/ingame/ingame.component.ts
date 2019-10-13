import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatchConfig } from 'src/app/model/MatchConfig';
import { MemoryCard, MemoryCardState } from 'src/app/model/MemoryCard';
import { IPlayer } from 'src/app/model/IPlayer';
import * as Actions from './../../actions/match.actions';

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.scss']
})
export class IngameComponent implements OnInit, OnDestroy {

  public matchConfig: MatchConfig;  	// from store

  private storeSubscription: any;

  private currentMatchDurationSeconds = 0;
  private gameTickIntervalId;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {

    this.storeSubscription = this.store.select('match')
      .subscribe(stats => {
        // console.log('store update ', stats.isGameOver);
        this.matchConfig = stats;

        if (this.matchConfig.isGameOver) {
          setTimeout(() => {
            this.router.navigate(['/gameover']);
          }, 1000);
        }
      });

    // ticks every second
    this.gameTickIntervalId = setInterval(() => {
      this.currentMatchDurationSeconds++;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      console.log('unsubscribing store');
      this.storeSubscription.unsubscribe();

      if (this.gameTickIntervalId) {
        clearInterval(this.gameTickIntervalId);
        this.gameTickIntervalId = null;
      }
    }

  }
  // lifecycle end

  public gotoStartScreen(): void {
    this.router.navigate(['/start']);
  }


  public cardClicked(event: MouseEvent, card: MemoryCard) {
    // console.log(MemoryCardState.REMOVED, card.state);

    if (card.state === MemoryCardState.REMOVED) {
      return;
    }

    const cardIsSelected = card.toggleSelected();
    // console.log(cardIsSelected);

    if (!cardIsSelected) {
      this.store.dispatch(new Actions.SetFirstSelectedCard(null));
    }

    if (cardIsSelected) {
      // no other card is selected
      if (!this.matchConfig.firstSelectedCard) {
        // select currend card as firstSelected
        this.store.dispatch(new Actions.SetFirstSelectedCard(card));
      } else {
        // compare cards
        if (this.matchConfig.firstSelectedCard.matches(card)) {
          // win
          // equal partnerId -> current player wins a point
          this.resetCards([this.matchConfig.firstSelectedCard, card], 500, MemoryCardState.REMOVED);
          this.store.dispatch(new Actions.ActivePlayerWinsPair());
          this.store.dispatch(new Actions.SetFirstSelectedCard(null));
        } else {
          // miss
          // unequal partnerId -> next player
          this.resetCards([this.matchConfig.firstSelectedCard, card], 500, MemoryCardState.COVERED);
          this.store.dispatch(new Actions.SetFirstSelectedCard(null));
          this.setNextPlayer();
        }
        // always: after timeout, hide (no success) or remove (success) selected cards
      }
    }
  }

  private setNextPlayer() {
    this.store.dispatch(new Actions.SetNextPlayer());
  }

  private resetCards(cards: MemoryCard[], delay: number, nextState: MemoryCardState): void {
    setTimeout(() => {
      cards.forEach(card => {
        card.state = nextState;
      });
    }, delay);
  }

  public getPlayer(id: number): IPlayer {
    return this.matchConfig.players[id];
  }

  public isActivePlayer(id: number): boolean {
    return this.matchConfig.activePlayer === id;
  }

  public get cards(): MemoryCard[] {
    return this.matchConfig ? this.matchConfig.cards : null;
  }

  public get tutorialName(): string {
    // return TutorialEnum.howToPlay;
    return 'tut-how-to-play';
  }

  public get currentMatchDurationTime(): string {
    return this.currentMatchDurationSeconds + ' seconds';
  }
}
