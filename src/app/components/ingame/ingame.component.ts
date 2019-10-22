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
import { GameService } from 'src/app/services/game.service';

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
            this.hideCards(this.matchConfig.cards);             // hide cards -> game over

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
      AnimationHelper.tween(document.getElementById('top-bar'), AnimationEnum.FADE_IN);

      this.introduceCards(this.matchConfig.cards);

    }, 300);  // milliseconds
  }



  ngOnDestroy(): void {
    if (this.storeSubscription) {
      // console.log('unsubscribing store');
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
    document.getElementById('game-over-notice').style.pointerEvents = 'none';
    
    AnimationHelper.tween(document.getElementById('top-bar'), AnimationEnum.FADE_OUT);
    AnimationHelper.tween(document.getElementById('game-over-notice'), AnimationEnum.FADE_OUT, () => {

      this.router.navigate(['/gameover']);
    });
  }


  private introduceCards(cards: MemoryCard[]) {
    AnimationHelper.animateCards(cards, AnimationEnum.FADE_IN, () => {
      // console.log('finished introducing cards: enable interaction');
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
    
    AnimationHelper.animateCards(cards, AnimationEnum.FADE_OUT, () => {
      // console.log('completed hiding cards');
      this.outroComplete = true; // shows game over quick info
      const element: HTMLElement = document.getElementById('game-over-notice');
      AnimationHelper.tween(element, AnimationEnum.FADE_IN, () => {
        element.style.pointerEvents = 'all';


        // AnimationHelper.tween(document.getElementById('top-bar'), AnimationEnum.FADE_OUT));
      });

    }, 0);
  }

  public cardMouseOver(event: MouseEvent, card: MemoryCard) {
    if (card.state === MemoryCardState.COVERED) {
      AnimationHelper.tween(card.htmlElement, AnimationEnum.HIGHLIGHT, () => {
        // console.log('card out complete');
      });
    }
  }

  public cardMouseOut(event: MouseEvent, card: MemoryCard) {
    if (card.state === MemoryCardState.COVERED) {
      // AnimationHelper.tween(card.htmlElement, AnimationEnum.TO_DEFAULT), () => {
      //   console.log('card out complete');
      // });
    }
  }

  // *** CARD CLICKED ***
  public cardClicked(event: MouseEvent, card: MemoryCard) {
    if (card.state === MemoryCardState.REMOVED) {
      return;
    }

    this.store.dispatch(new Actions.SelectedCard(card));  // de-select card
  }

  public get showGameOver(): boolean {
    return this.matchConfig.isGameOver && this.outroComplete;
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
