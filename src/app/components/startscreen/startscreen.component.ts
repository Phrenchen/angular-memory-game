import { Component, OnInit, Input, AfterContentChecked, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as Actions from './../../actions/match.actions';
import { Router } from '@angular/router';
import { AnimationConfig, AnimationEnum, AnimationHelper } from 'src/app/helper/AnimationHelper';
import { SVGHelper } from 'src/app/helper/SVGHelper';
import { MathHelper } from 'src/app/helper/MathHelper';
import { CSSHelper } from 'src/app/helper/CSSHelper';
import { TweenMax } from 'gsap';
import { Rectangle } from 'src/app/helper/model/Rectangle';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit, AfterContentChecked, AfterViewChecked, AfterViewInit {
  
  // private fancySVGs: SVGSVGElement[] = [];
  public selectedPlayerCount = 1;

  // LIFE CYCLE
  constructor(private router: Router, private store: Store<AppState>) { }
  
  ngOnInit() {  
    // console.log('***** INIT START SCREEN *****');
  }
  ngAfterViewInit(): void {
    AnimationHelper.tween(document.getElementById('container-startscreen'), AnimationEnum.FADE_IN, () => {
      // console.log('intro complete');
    });
    

    // this.addFancySVGs();

    // // add generated (fullscreen) svg to background. position absolute (centered?)
    // const bodyStyle = getComputedStyle(document.body);
    // const stopColor1 = bodyStyle.getPropertyValue('--main-primary-color');
    // const stopColor2 = bodyStyle.getPropertyValue('--main-secondary-color');
    // const svg = SVGHelper.createSVG(stopColor1, stopColor2);
    // document.getElementById('background-container').appendChild(svg);
  }

  // addFancySVGs() {
  //   // add small rectangle
  //   const bodyStyle = getComputedStyle(document.body);
  //   let stopColor1 = bodyStyle.getPropertyValue('--main-primary-color');
  //   let stopColor2 = bodyStyle.getPropertyValue('--main-secondary-color');
  //   let svgCount = 40;
  //   let svg: SVGSVGElement;

  //   let rangeX = CSSHelper.stageWidth() * .4;
  //   let rangeY = CSSHelper.stageHeight() * .4;

  //   let left = CSSHelper.stageCenterX() - rangeX;
  //   let right = CSSHelper.stageCenterX() + rangeX;

  //   let top = CSSHelper.stageCenterY() - rangeY;
  //   let bottom = CSSHelper.stageCenterY() + rangeY;

  //   // size
  //   let minWidth = 100;
  //   let maxWidth = 800;
  //   let minHeight = 100;
  //   let maxHeight = 600;
  //   let svgWidth: number;
  //   let svgHeight: number;
  //   const backgroundContainer: HTMLElement = document.getElementById('background-container');

  //   // for each svg
  //   for(let i=0; i<svgCount; i++) {
  //     svgWidth = MathHelper.getRandomInt(minWidth, maxWidth);
  //     svgHeight = MathHelper.getRandomInt(minHeight, maxHeight);

  //     svg = SVGHelper.createSVG(svgWidth, svgHeight, stopColor1, stopColor2);
  //     svg.style.position = 'fixed';

  //     svg.style.left = MathHelper.getRandomInt(left, right) - svgWidth * .5 + 'px';
  //     svg.style.top = MathHelper.getRandomInt(top, bottom) - svgHeight * .5 + 'px';

  //     this.fancySVGs.push(svg);
  //     backgroundContainer.appendChild(svg);

  //     // animate endlessly
  //     this.animateSVG(svg, {
  //       left: 0,
  //       top: 0,
  //       right: CSSHelper.stageWidth(),
  //       bottom: CSSHelper.stageHeight()
  //     });
  //   }
  // }

  // /**
  //  * - moves an SVG to a random position.
  //  * - seeks new target upon arrival
  //  * @param svg 
  //  * @param viewport 
  //  */
  // private animateSVG(svg: SVGSVGElement, viewport: Rectangle): void {
  //   const x = MathHelper.getRandomInt(viewport.left, viewport.right);
  //   const y = MathHelper.getRandomInt(viewport.top, viewport.bottom);
  //   const delay = MathHelper.getRandomInt(0, 3000);
  //   const duration = MathHelper.getRandomInt(1, 30);

  //   setTimeout(() => {
  //     AnimationHelper.tweenSVGToPosition(svg, x, y, duration, () => {
  //       console.log('tween complete');
  //       this.animateSVG(svg, viewport);
  //     });
  //   }, delay);
  // }

  ngAfterViewChecked(): void {
  }
  
  ngAfterContentChecked(): void {
  }
  // LIFE CYCLE end


  public playerCount(playerCount: number): void {
    console.log('player count change', playerCount);
    this.store.dispatch(new Actions.SetPlayerCount(playerCount));
  }

  public startMatch() {
    AnimationHelper.tween(document.getElementById('container-startscreen'), AnimationEnum.FADE_OUT, () => {
      // console.log('start screen outro complete');
      this.store.dispatch(new Actions.CreateMatch());
      this.router.navigate(['/memory']);
    });
  }


  public get tutorialName(): string {
    // return TutorialEnum.howToPlay;
    return 'tut-game-rules';
  }

  // ----------------------------------------------------
  // TODO: MOVE TO Helper class!
  private loadImage(file, imagePool: any[]) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      imagePool.push(reader.result);
    };
  }
}
