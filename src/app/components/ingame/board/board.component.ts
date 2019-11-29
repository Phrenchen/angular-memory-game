import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MemoryCard, MemoryCardState } from 'src/app/model/MemoryCard';
import { AnimationHelper, AnimationEnum } from 'src/app/helper/AnimationHelper';

import * as Actions from './../../../actions/match.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CSSHelper } from 'src/app/helper/CSSHelper';
import { MathHelper } from 'src/app/helper/MathHelper';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {

  @Input() cards: MemoryCard[];

  // LIFE CYCLE
  constructor(private store: Store<AppState>) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    // position cards

    const cardElements = document.querySelectorAll('.card');
    const board = document.querySelector('app-board');
    const boardRect = board.getBoundingClientRect();

    const cardCount: number = cardElements.length;
    const boardWidth: number = boardRect.width;
    const boardHeight: number = boardRect.height;

    const isPortraitMode: boolean = boardWidth < boardHeight;
    const positioningRange: number = 0;  // each position has an origin. place somewhere within range
    const columnCount: number = isPortraitMode ? 3 : 4;
    const rowCount: number = Math.floor(cardCount / columnCount);
    const cardWidth: number = Math.floor(boardWidth / columnCount);
    const cardHeight: number = Math.floor(boardHeight / (rowCount));

    const gapX: number = 0;
    const gapY: number = 0;

    let cardHtmlElement: HTMLElement;

    cardElements.forEach((card, index) => {
      let column: number = index % (columnCount);
      let row: number = Math.floor(index / columnCount);


      let positionX: number = column * (cardWidth + gapX);
      let positionY: number = row * (cardHeight + gapY);
      positionX = MathHelper.getRandomInt(positionX - positioningRange, positionX + positioningRange);
      positionY = MathHelper.getRandomInt(positionY - positioningRange, positionY + positioningRange);

      cardHtmlElement = card as HTMLElement;
      const cardContainer = cardHtmlElement.querySelector('.card-container');
      const cardImage = cardHtmlElement.querySelector('img');

      let styleStr: string =
        'position: absolute; ' +
        'left: ' + positionX + 'px; ' +
        'top: ' + positionY + 'px; ' +
        'width:' + cardWidth + 'px; ' +
        'height:' + cardHeight + 'px; ';


      cardContainer.setAttribute('style', styleStr);

      let imageStyleStr: string =
        'width:' + cardWidth + 'px; ' +
        'height:' + cardHeight + 'px; ';
      cardImage.setAttribute('style', imageStyleStr);


      console.log('******');
      console.log('index: ', index);

      // console.log('board width: ', boardWidth);
      // console.log('board height: ', boardHeight);
      
      console.log('column / row: ', column + ' / ' + row);
      
      // console.log('card width: ', cardWidth);
      // console.log('card height: ', cardHeight);
      
      // console.log('positionX: ', positionX);
      // console.log('positionY: ', positionY);

      console.log('****** - *************');

    });

    console.log('cards: ', cardElements);

  }
  // LIFE CYCLE end

  public cardMouseOver(event: MouseEvent, card: MemoryCard) {
    event.stopImmediatePropagation();

    if (card.state === MemoryCardState.COVERED) {
      AnimationHelper.tween(card.htmlElement, AnimationEnum.FADE_OUT, () => {
        // console.log('card out complete');
      });
    }
  }

  public cardMouseOut(event: MouseEvent, card: MemoryCard) {
    // if (card.state === MemoryCardState.COVERED) {
    //   AnimationHelper.tween(card.htmlElement, AnimationEnum.FADE_IN, () => {
    //     console.log('card in complete');
    //   });
    // }
  }

  // *** CARD CLICKED ***
  public cardClicked(event: MouseEvent, card: MemoryCard) {
    if (card.state === MemoryCardState.REMOVED) {
      return;
    }

    this.store.dispatch(new Actions.SelectedCard(card));  // de-select card
  }
}
