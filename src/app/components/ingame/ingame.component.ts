import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatchConfig } from 'src/app/model/MatchConfig';
import { MemoryCard, MemoryCardState } from 'src/app/model/MemoryCard';
import { IPlayer } from 'src/app/model/IPlayer';
import * as Actions from './../../actions/match.actions';
import { TweenMax, Power3, Power1, Power4 } from 'gsap';
import { AnimationHelper, AnimationConfig, AnimationEnum } from 'src/app/helper/AnimationHelper';

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.scss']
})
export class IngameComponent implements OnInit, AfterViewInit, OnDestroy {

  public matchConfig: MatchConfig;  	// from store

  private storeSubscription: any;

  private currentMatchDurationSeconds = 0;
  private gameTickIntervalId;
  private hasBeenInitialized = false;
  private outroComplete = false;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {

    this.storeSubscription = this.store.select('match')
      .subscribe(stats => {
        // console.log('store update ', stats.isGameOver);
        this.matchConfig = stats;

        if (!this.hasBeenInitialized) {
          this.hasBeenInitialized = true;
          this.setupCards(this.matchConfig.cards);
        }

        if (this.matchConfig.isGameOver) {
          clearInterval(this.gameTickIntervalId);

          const gameOverStateDelay = 1000;
          // console.log('game over! ');


          setTimeout(() => {
            this.hideCards(this.matchConfig.cards);

            //   this.router.navigate(['/gameover']);

          }, gameOverStateDelay);
        }
      });

    // ticks every second
    this.gameTickIntervalId = setInterval(() => {
      this.store.dispatch(new Actions.GameTick());
      this.currentMatchDurationSeconds++;
    }, 1000);
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.introduceCards(this.matchConfig.cards);

    }, 300);  // milliseconds
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

  public continueToGameOver(): void {
    this.router.navigate(['/gameover']);
  }


  private introduceCards(cards: MemoryCard[]) {
    AnimationHelper.animateCards(cards, AnimationConfig.getConfig(AnimationEnum.FADE_IN), () => {
      console.log('finished introducing cards: enable interaction');
      let htmlElement;

      cards.forEach(card => {
        htmlElement = card.htmlElement;
        htmlElement.style.pointerEvents = 'all';
      });
    },
    0);
  }

  private hideCards(cards: MemoryCard[]): void {
    cards.forEach(card => {
      card.htmlElement.style.pointerEvents = 'none';
    });

    AnimationHelper.animateCards(cards, AnimationConfig.getConfig(AnimationEnum.FADE_OUT), () => {
      console.log('completed hiding cards');
      this.outroComplete = true; // shows game over quick info
    }, 0);
  }

  public cardMouseOver(event: MouseEvent, card: MemoryCard) {
    if (card.state === MemoryCardState.COVERED) {
      // AnimationHelper.tween(card.htmlElement, AnimationConfig.getConfig(AnimationEnum.FADE_IN), () => {
      //   console.log('card out complete');
      // });

      const duration = 0.6;
      const target: HTMLElement = event.target as HTMLElement;
      const fromVars = {
        width: target.style.width,
        height: target.style.height,
        opacity: target.style.opacity,
        ease: Power3.easeOut
      };
      const toVars = {
        width: '105%',
        height: '105%',
        opacity: .3,
        ease: Power3.easeOut
      };
      TweenMax.killChildTweensOf(card.htmlElement);
      TweenMax.fromTo(card.htmlElement, duration, fromVars, toVars);


    }
  }

  public cardMouseOut(event: MouseEvent, card: MemoryCard) {
    if (card.state === MemoryCardState.COVERED) {
      AnimationHelper.tween(card.htmlElement, AnimationConfig.getConfig(AnimationEnum.TO_DEFAULT), () => {
        console.log('card out complete');
      });
      
      // const duration = 0.6;
      // const target: HTMLElement = event.target as HTMLElement;
      // const fromVars = {
      //   width: target.style.width,
      //   height: target.style.height,
      //   opacity: target.style.opacity,
      //   ease: Power3.easeInOut
      // };
      // const toVars = {
      //   width: '100%',
      //   height: '100%',
      //   opacity: 1,
      //   ease: Power3.easeInOut
      // };
      // TweenMax.killChildTweensOf(card.htmlElement);
      // TweenMax.fromTo(card.htmlElement, duration, fromVars, toVars);
    }
  }

  public cardClicked(event: MouseEvent, card: MemoryCard) {
    if (card.state === MemoryCardState.REMOVED) {
      return;
    }
    const cardIsSelected = card.toggleSelected();

    AnimationHelper.tween(card.htmlElement, AnimationConfig.getConfig(AnimationEnum.TO_DEFAULT));

    if (!cardIsSelected) {
      this.store.dispatch(new Actions.SetFirstSelectedCard(null));  // de-select card
    }
    else {
      // no other card is selected
      if (!this.matchConfig.firstSelectedCard) {
        this.store.dispatch(new Actions.SetFirstSelectedCard(card));  // select currend card as firstSelected
      } else {
        if (this.matchConfig.firstSelectedCard.matches(card)) { // compare cards
          this.resetCards([this.matchConfig.firstSelectedCard, card], 500, MemoryCardState.REMOVED);  // win: equal partnerId -> current player wins a point
          this.store.dispatch(new Actions.ActivePlayerWinsPair());
          this.store.dispatch(new Actions.SetFirstSelectedCard(null));
        } else {
          this.resetCards([this.matchConfig.firstSelectedCard, card], 500, MemoryCardState.COVERED);  // miss: unequal partnerId -> next player
          this.store.dispatch(new Actions.SetFirstSelectedCard(null));    // reset card when miss
          this.setNextPlayer();                                           // set next player
        }
        // always: after timeout, hide (no success) or remove (success) selected cards
      }
    }
  }

  public get showGameOver(): boolean {
    return this.matchConfig.isGameOver && this.outroComplete;
  }

  private setNextPlayer() {
    this.store.dispatch(new Actions.SetNextPlayer());
  }

  private setupCards(cards: MemoryCard[]): void {
    if (!cards) {
      return;
    }
    cards.forEach((card, index) => {
      card.cardPosition = index;  // assign DOM id selector to MemoryCard
    });
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
