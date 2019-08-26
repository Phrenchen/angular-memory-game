import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatchConfig } from 'src/app/model/MatchConfig';
import { MemoryCard, MemoryCardState } from 'src/app/model/MemoryCard';
import { Player } from 'src/app/model/Player';

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.scss']
})
export class IngameComponent implements OnInit {

  public matchConfig: MatchConfig;

  private firstCard: MemoryCard;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {

    this.store.select('match')
      .subscribe(stats => {
        console.log('start game with ', stats);


        // start game
        this.matchConfig = stats;

        // players and cards are created
      });
  }

  public cardClicked(event: MouseEvent, card: MemoryCard) {
    // console.log(event, card);
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

          this.resetCards([this.firstCard, card], 500, MemoryCardState.REMOVED);
          this.firstCard = null;
        } else {
          // miss
          // unequal partnerId -> next player
          console.log('miss');

          this.resetCards([this.firstCard, card], 500, MemoryCardState.COVERED);
          this.firstCard = null;
        }

        // always: after timeout, hide (no success) or remove (success) selected cards
      }
    }
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

  public get cards(): MemoryCard[] {
    return this.matchConfig ? this.matchConfig.cards : null;
  }
}
