import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MatchConfig } from 'src/app/model/MatchConfig';
import { MathHelper } from 'src/app/helper/MathHelper';
import { CardSelectedEvent } from 'src/app/model/CardSelectedEvent';
import { Rectangle } from 'src/app/helper/model/Rectangle';
import { CSSHelper } from 'src/app/helper/CSSHelper';
import { SortHelper } from 'src/app/helper/model/SortHelper';
import { FakeDataProvider } from 'src/app/helper/model/FakeDataProvider';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit, AfterViewInit {
  @Input() matchConfig: MatchConfig;

  public uniqueId: string = 'unique_id_';
  private static timeLineCounter = 0;
  private id: number;

  private _allChoices: CardSelectedEvent[] = [];


  constructor(private imageService: ImageService) { 
    this.id = TimeLineComponent.timeLineCounter++;
    this.uniqueId += this.id + '_';
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // position elements along the timeline

    if (!this.matchConfig) {
      return;
    }

    this.setupEvents();
    // });
  }

  private async setupEvents() {
    await setTimeout(() => {
      this._allChoices = this.prepareChoices(this.matchConfig);

      // assuming there is always an event with game over is set
      this.matchConfig.matchEndTime = this._allChoices.find(choice => {
        return choice.isGameOver;
      }).occuredAt;
    }, 0);

    await setTimeout(() => {
      this.positionEvents(this._allChoices);
    });

  }

  private prepareChoices(matchConfig: MatchConfig): CardSelectedEvent[] {
    let choices: CardSelectedEvent[] = [];


    matchConfig.players.forEach(player => {
      if (player.choices && player.choices.length > 0) {
        choices = this.allChoices.concat(player.choices);
      }
    });

    if (choices.length === 0) {
      console.log('using static event data');
      choices = FakeDataProvider.createRandomChoices();
    }
    choices = SortHelper.sortChoices(choices);

    console.log('choices: ', choices);
    return choices;
  }
  // LIFE CYCLE end

  public get allChoices(): CardSelectedEvent[] {
    return this._allChoices;
  }

  public showCardEvent(cardEvent: CardSelectedEvent) {
    return cardEvent.isMatch;
  }

  public imageUrl(partnerId: number): string {
    return this.imageService.getUrl(partnerId);
  }

  /**
   * position elements above (player 1) and below (player 2) the time line axis.
   * assuming the line is not angled: startY === endY required for correct positioning
   *
   * line left border: 0% time
   * line right border: 100% time
   * @param cardEvents 
   */
  private positionEvents(cardEvents: CardSelectedEvent[]): void {
    const eventMarkerPlayer = document.querySelectorAll('.' + this.uniqueId);
    // console.log('event elements: ', eventMarkerPlayer.length);

    if (eventMarkerPlayer.length === 0) {
      console.log('WARNING: no events for time line!');
    }

    const line: HTMLElement = document.querySelector('#the-time-line-' + this.uniqueId) as HTMLElement;

    if (!line) {
      console.log('ERROR: need #the-time-line to position event elements');
      return;
    }

    const bodyRect = document.body.getBoundingClientRect();
    const linePositionTest: Rectangle = CSSHelper.getFixedPositionOf(line);

    let linePosition: Rectangle = CSSHelper.convertToRectangle(line.getBoundingClientRect());
    let startX: number = Math.round(linePosition.left - bodyRect.left);
    // let startX: number = Math.round(linePosition.left);
    let startY: number = Math.round(linePosition.top - bodyRect.top);
    // let startY: number = Math.round(linePosition.top);

    // startX = 0;
    // startY = 0;

    linePosition = linePositionTest;    // test line position

    const endX = linePosition.right;
    // const endY = linePosition.top;

    const lineWidth: number = endX - startX;
    // const eventYplayer1 = startY;// - 50;  // aligning all events of player 1 ABOVE the line
    // const eventYplayer2 = startY;// + 50;  // aligning all events of player 2 BELOW the line
    let cardEvent: CardSelectedEvent;
    let posY: number;
    let posX: number;
    let wayTravelled: number;
    let elementHeight: number;
    let elementWidth: number;

    // const lastEvent: CardSelectedEvent = cardEvents.find(event => {
    //   return event.isGameOver;
    // });

    let eventTime: number;
    let timePassed: number;
    let percentTimePassed: number;
    // const t0: Date = new Date(0);
    let matchStartTime: number = this.matchStartTime; // 0% match time
    const matchEndTime: number = this.matchEndTime;     // 100% match time
    let matchDuration = matchEndTime - matchStartTime;
    let lineMargin = 20;

    // console.log('**********************************');
    // console.log('last event:', lastEvent);
    // console.log('line position testing CSSHelper.getFixedPositionOf(line):', linePositionTest);
    // console.log('lineWidth: ', lineWidth);
    console.log('matchStartTime: ', matchStartTime);
    console.log('total match duration: ', matchDuration);
    // console.log('matchStartTime: ', matchStartTime);
    // console.log('matchStart date: ', new Date(matchStartTime));
    // console.log('matchEndTime: ', matchEndTime);
    // console.log('matchEnd date: ', new Date(matchEndTime));
    // console.log('------');

    let htmlElement: HTMLElement;
    let elementWidthStr: string;

    // for each event element:
    eventMarkerPlayer.forEach((element, index) => {
      htmlElement = element as HTMLElement;
      cardEvent = cardEvents[index];

      // first element
      if(index === 0) {
        // remove initial delay between match start and first event
        const firstEventTime = cardEvent.occuredAt.getTime();
        // console.log('before matchStartTime: ', matchStartTime);
        
        // matchStartTime = firstEventTime;
        
      }
      
      eventTime = cardEvent.occuredAt.getTime();
      timePassed = eventTime - matchStartTime;
      percentTimePassed = MathHelper.distanceTravelledPercent(timePassed, matchDuration);
      elementWidth = htmlElement.getBoundingClientRect().width;
      elementHeight = htmlElement.getBoundingClientRect().height;
      wayTravelled = lineWidth * (percentTimePassed / 100);
      
      elementWidth = 30;
      elementHeight = 30;
      lineMargin = 0;
      
      console.log('matchStartTime: ', matchStartTime);
      
      console.log('eventTime: ', eventTime);
      console.log('timePassed: ', (eventTime - matchStartTime));
      console.log('eventTime: ', eventTime);

      console.log('percent time passed: ', percentTimePassed);
      console.log('match duration: ', matchDuration);


      posX = startX + wayTravelled - elementWidth * .5;
      posY = cardEvent.actorId === 1 ?
        (startY - elementHeight - lineMargin) :
        (startY + lineMargin);

      posY = startY;
      posY -= elementHeight * .5;

      // write CSS
      if (cardEvent.isGameOver) {
        htmlElement.style.border = '3px solid red';
        htmlElement.style.borderRadius = '50%';
      }

      htmlElement.style.position = 'fixed';
      // htmlElement.style.position = 'relative';
      htmlElement.style.left = posX + 'px';
      htmlElement.style.top = posY + 'px';
      htmlElement.style.zIndex = (index + 1).toString();

      // console.log('cardEvent.isGameOver: ', cardEvent.isGameOver);
      // console.log(linePosition);
      // console.log(element);
      // console.log('**********************');
    });

  }

  private get matchStartTime(): number {
    return this.matchConfig.matchStartTime.getTime();
  }

  private get matchEndTime(): number {
    return this.matchConfig.matchEndTime.getTime();
  }


}
