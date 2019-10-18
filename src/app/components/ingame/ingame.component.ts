import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatchConfig } from 'src/app/model/MatchConfig';
import { MemoryCard, MemoryCardState } from 'src/app/model/MemoryCard';
import { IPlayer } from 'src/app/model/IPlayer';
import * as Actions from './../../actions/match.actions';
import { TweenMax, Power3, Power1, Power4 } from 'gsap';

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
    const elements: HTMLElement[] = [];

    cards.forEach((card, index) => {
      const element: HTMLElement = document.getElementById(card.cardSelector);

      if (element) {
        elements.push(element);
      }
    });

    const duration = .3;
    const stagger: number = .03; // delay
    const fromVars = {
      // width: '0',
      // height: '0',
      width: '90%',
      height: '90%',
      opacity: 0.0
    };
    const toVars = {
      width: '100%',
      height: '100%',
      opacity: 1
    };
    TweenMax.staggerFromTo(elements, duration, fromVars, toVars, stagger, () => {
      // on complete all
      elements.forEach(ele => {
        ele.style.pointerEvents = 'all';
      });

    }, [], null);
  }

  private hideCards(cards: MemoryCard[]): void {
    cards.forEach((card, index) => {
      // if (card.state === MemoryCardState.COVERED) {
      const duration = 0.3;
      const fromVars = {
        width: '100%',
        height: '100%',
        opacity: 1.0,
        // backgroundColor: 'white'
      };
      const toVars = {
        width: '90%',
        height: '90%',
        opacity: 0.0,
        // backgroundColor: '#000000',
        onComplete: () => {
          console.log('card ' + card.cardPosition + ' hidden');
          if (card.cardPosition === cards.length - 1) {
            console.log('last card in Array hidden');
            this.outroComplete = true;
            
            // NAVIGATE TO GAME OVER ROUTE
            // const gameOverStateDelay = 700; // ms
            // setTimeout(() => {
            //   this.router.navigate(['/gameover']);
            // }, gameOverStateDelay);
          }
        }
      };
      const element = document.getElementById(card.cardSelector);
      element.style.pointerEvents = 'none';
      TweenMax.fromTo(element, duration, fromVars, toVars);

      // console.log('tweening mouse over: ' + card.cardSelector);
    });
  }
  

  


  public cardMouseOver(event: MouseEvent, card: MemoryCard) {
    // animate target card 
    // animate neighbouring cards with a small delay, "spreading out the effect"
    // const cards = this.matchConfig.cards;

    // *** set style directly. this currently breaks displaying the front side of the card -> same property. next: add image to front ***
    // this.setCardColor(cards, MemoryCardState.COVERED, 'white');

    if (card.state === MemoryCardState.COVERED) {
      const duration = 0.6;
      const target: HTMLElement = event.target as HTMLElement;
      const fromVars = {
        // yoyo: true,
        // repeat: 1,
        width: target.style.width,
        height: target.style.height,

        opacity: target.style.opacity,
        // backgroundColor: 'white'
        ease: Power3.easeOut
      };
      const toVars = {
        // yoyo: true,
        // repeat: 1,
        width: '105%',
        height: '105%',
        opacity: .3,
        // backgroundColor: '#DDDDDD'
        ease: Power3.easeOut
      };

      TweenMax.killChildTweensOf(document.getElementById(card.cardSelector));
      TweenMax.fromTo(document.getElementById(card.cardSelector), duration, fromVars, toVars);
    }
  }

  public cardMouseOut(event: MouseEvent, card: MemoryCard) {
    if (card.state === MemoryCardState.COVERED) {
      const duration = 0.6;
      const target: HTMLElement = event.target as HTMLElement;
      const fromVars = {
        // yoyo: true,
        // repeat: 1,
        width: target.style.width,
        height: target.style.height,

        opacity: target.style.opacity,
        // backgroundColor: 'white'
        ease: Power3.easeInOut
      };
      const toVars = {
        // yoyo: true,
        // repeat: 1,
        width: '100%',
        height: '100%',
        opacity: 1,
        // backgroundColor: '#DDDDDD'
        ease: Power3.easeInOut
      };

      TweenMax.killChildTweensOf(document.getElementById(card.cardSelector));
      TweenMax.fromTo(document.getElementById(card.cardSelector), duration, fromVars, toVars);
    }
  }

  public cardClicked(event: MouseEvent, card: MemoryCard) {
    // console.log(MemoryCardState.REMOVED, card.state);
    if (card.state === MemoryCardState.REMOVED) {
      return;
    }

    // const target: HTMLElement = event.target as HTMLElement;
    const cardIsSelected = card.toggleSelected();

    
    const duration = 0.2;
      const target: HTMLElement = event.target as HTMLElement;
      const fromVars = {
        // yoyo: true,
        // repeat: 1,
        width: target.style.width,
        height: target.style.height,

        opacity: target.style.opacity,
        // backgroundColor: 'white'
        ease: Power3.easeInOut
      };
      const toVars = {
        // yoyo: true,
        // repeat: 1,
        width: '100%',
        height: '100%',
        opacity: 1,
        // backgroundColor: '#DDDDDD'
        ease: Power3.easeInOut
      };

      TweenMax.killChildTweensOf(document.getElementById(card.cardSelector));
      TweenMax.fromTo(document.getElementById(card.cardSelector), duration, fromVars, toVars);

    // TweenMax.killChildTweensOf(document.getElementById(card.cardSelector));
    

    
    // document.getElementById(card.cardSelector).style.opacity = '1';

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
