import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MatchConfig } from 'src/app/model/MatchConfig';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Player } from 'src/app/model/Player';
import { AnimationHelper, AnimationConfig, AnimationEnum } from 'src/app/helper/AnimationHelper';
import { CardSelectedEvent } from 'src/app/model/CardSelectedEvent';
import { FakeDataProvider } from 'src/app/helper/model/FakeDataProvider';
import { MathHelper } from 'src/app/helper/MathHelper';
import { SortHelper } from 'src/app/helper/model/SortHelper';
import { ImageService } from 'src/app/services/image.service';
import { Rectangle } from 'src/app/helper/model/Rectangle';
import { CSSHelper } from 'src/app/helper/CSSHelper';
import { TimeHelper } from 'src/app/helper/TimeHelper';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})
export class GameoverComponent implements OnInit, AfterViewInit, OnDestroy {

  public matchConfig: MatchConfig;

  private sortedPlayers: Player[];
  private storeSubscription: any;

  private _allChoices: CardSelectedEvent[] = [];

  // LIFE CYCLE
  constructor(private router: Router, private store: Store<AppState>, private imageService: ImageService) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('match')
      .subscribe(stats => {
        this.matchConfig = stats;

        this.matchConfig.players.forEach(player => {
          if (player.choices && player.choices.length > 0) {
            this._allChoices = this.allChoices.concat(player.choices);
          }
        });

        if (this.allChoices.length === 0) {
          console.log('using static event data');
          // this._allChoices = this._allChoices.concat(SortHelper.sortChoices(FakeDataProvider.getRealMatch()));
          this._allChoices = this._allChoices.concat(SortHelper.sortChoices(FakeDataProvider.createRandomChoices()));
        }

        console.log(this._allChoices);
        console.log(JSON.stringify(this._allChoices));

        let sortedPlayers = this.matchConfig.players.sort((a, b) => {
          return a.pairsWon - b.pairsWon;
        });

        this.sortedPlayers = sortedPlayers.reverse();
        // console.log('sortedPlayers: ', this.sortedPlayers);

      });

    AnimationHelper.tween(document.getElementById('game-over-container'), AnimationEnum.FADE_IN);
  }

  ngAfterViewInit(): void {
    // position elements along the timeline
    this.positionEvents(this._allChoices);
  }


  ngOnDestroy(): void {
    if (this.storeSubscription) {
      console.log('unsubscribing');
      this.storeSubscription.unsubscribe();
    }

  }
  // LIFE CYCLE ends

  /**
   * position elements above (player 1) and below (player 2) the time line axis.
   * assuming the line is not angled: startY === endY required for correct positioning
   *
   * line left border: 0% time
   * line right border: 100% time
   * @param cardEvents 
   */
  private positionEvents(cardEvents: CardSelectedEvent[]): void {
    const eventMarkerPlayer = document.querySelectorAll('.event-container');
    console.log('event elements: ', eventMarkerPlayer.length);

    const line: HTMLElement = document.querySelector('#the-time-line') as HTMLElement;

    if(!line) {
      console.log('ERROR: need #the-time-line to position event elements');
      return;
    }

    const bodyRect = document.body.getBoundingClientRect();
    const linePositionTest: Rectangle = CSSHelper.getFixedPositionOf(line);

    const linePosition: Rectangle = CSSHelper.convertToRectangle(line.getBoundingClientRect());
    const startX: number = Math.round(linePosition.left - bodyRect.left);
    const startY: number = Math.round(linePosition.top - bodyRect.top);

    const endX = linePosition.right;
    // const endY = linePosition.top;

    const lineWidth: number = endX - startX;

    const eventYplayer1 = startY - 100;  // aligning all events of player 1 ABOVE the line
    const eventYplayer2 = startY + 100;  // aligning all events of player 2 BELOW the line
    let cardEvent: CardSelectedEvent;
    let posY: number;
    let posX: number;
    let wayTravelled: number;
    let elementWidth: number;
    
    const firstEvent: CardSelectedEvent = cardEvents[0];                     // first action in game
    const lastEvent: CardSelectedEvent = cardEvents.find(event => {
      return event.isGameOver;
    });
    
    let eventTime: number;
    let timePassed: number;
    let percentTimePassed: number;
    // const t0: Date = new Date(0);
    const matchStartTime: number = this.matchStartTime;
    const matchEndTime: number = this.matchEndTime;     // 100% match time
    const matchDuration = matchEndTime - matchStartTime;






    console.log('**********************************');
    console.log('line position testing CSSHelper.getFixedPositionOf(line):', linePositionTest);
    console.log('lineWidth: ', lineWidth);
    console.log('match duration: ', matchDuration);
    // console.log('matchStartTime: ', matchStartTime);
    // console.log('matchStart date: ', new Date(matchStartTime));
    // console.log('matchEndTime: ', matchEndTime);
    // console.log('matchEnd date: ', new Date(matchEndTime));


    console.log('------');
    
    let htmlElement: HTMLElement;
    let elementWidthStr: string;

    // for each event element:
    eventMarkerPlayer.forEach((element, index) => {
      htmlElement = element as HTMLElement;
      cardEvent = cardEvents[index];
      
      
      
      eventTime = cardEvent.occuredAt.getTime();
      timePassed = eventTime - matchStartTime;
      percentTimePassed = MathHelper.distanceTravelledPercent(timePassed, matchDuration);
      elementWidth = htmlElement.getBoundingClientRect().width;
      wayTravelled = lineWidth * (percentTimePassed / 100);
      
      
      console.log('startX: ', startX);
      console.log('startY: ', startY);
      console.log('elementWidth: ', elementWidth);
      console.log('lineWidth: ', lineWidth);
      console.log('endX: ', endX);
      console.log('timePassed: ', timePassed);
      console.log('percent time passed: ', percentTimePassed);
      console.log('wayTravelled: ', wayTravelled);
      posX = startX + wayTravelled;
      posY = cardEvent.actorId === 1 ? eventYplayer1 : eventYplayer2;
      
      console.log('posX: ', posX);


      htmlElement.style.position = 'fixed';
      htmlElement.style.left = posX + 'px';
      if(cardEvent === lastEvent) {
        console.log('overriding; positioning last event item ', posX);
        // htmlElement.style.left = endX + 'px';

      }
      htmlElement.style.top = posY + 'px';
      
      console.log(linePosition);
      console.log(element);
      console.log('**********************');
    });

  }

  private get matchStartTime(): number {
    return this.matchConfig.matchStartTime.getTime();
  }

  private get matchEndTime(): number {
    return this.matchConfig.matchEndTime.getTime();
  }



  public playAgain(): void {
    AnimationHelper.tween(document.getElementById('game-over-container'), AnimationEnum.FADE_OUT, () => {
      // console.log('intro complete');
      this.router.navigate(['/start']);
    });
  }

  public get allChoices(): CardSelectedEvent[] {
    return this._allChoices;
  }

  public hasImage(partnerId: number): boolean {
    return this.imageService.hasImage(partnerId);
  }

  public imageUrl(partnerId: number): string {
    return this.imageService.getUrl(partnerId);
  }

  public showCardEvent(cardEvent: CardSelectedEvent) {
    return cardEvent.isMatch;
  }

  public get winnerPlayer(): Player {
    return this.sortedPlayers[0];
  }
}
