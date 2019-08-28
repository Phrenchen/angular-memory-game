import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatchConfig } from 'src/app/model/MatchConfig';
import { MemoryCard, MemoryCardState } from 'src/app/model/MemoryCard';
import { Player } from 'src/app/model/Player';
import * as Actions from './../../actions/match.actions';

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.scss']
})
export class IngameComponent implements OnInit, OnDestroy {

  public matchConfig: MatchConfig;

  private firstCard: MemoryCard;
  private storeSubscription: any;

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
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      console.log('unsubscribing');
      this.storeSubscription.unsubscribe();
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
      this.firstCard = null;
    }

    if (cardIsSelected) {
      // no other card is selected
      if (!this.firstCard) {
        // select currend card as firstSelected
        this.firstCard = card;
      } else {
        // compare cards
        if (this.firstCard.matches(card)) {
          // win
          // equal partnerId -> current player wins a point
          console.log('win');

          this.store.dispatch(new Actions.ActivePlayerWinsPair());

          this.resetCards([this.firstCard, card], 500, MemoryCardState.REMOVED);
          this.firstCard = null;
        } else {
          // miss
          // unequal partnerId -> next player
          console.log('miss');

          this.resetCards([this.firstCard, card], 500, MemoryCardState.COVERED);
          this.firstCard = null;

          // increase score for successful player


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

  public getPlayer(id: number): Player {
    return this.matchConfig.players[id];
  }

  public isActivePlayer(id: number): boolean {
    return this.matchConfig.activePlayer === id;
  }

  public get cards(): MemoryCard[] {
    return this.matchConfig ? this.matchConfig.cards : null;
  }
}
