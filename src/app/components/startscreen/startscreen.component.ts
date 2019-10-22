import { Component, OnInit, Input, AfterContentChecked, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as Actions from './../../actions/match.actions';
import { Router } from '@angular/router';
import { AnimationConfig, AnimationEnum, AnimationHelper } from 'src/app/helper/AnimationHelper';
import { SVGHelper } from 'src/app/helper/SVGHelper';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit, AfterContentChecked, AfterViewChecked, AfterViewInit {
  
  // LIFE CYCLE
  constructor(private router: Router, private store: Store<AppState>) { }
  
  ngOnInit() {  
    // console.log('***** INIT START SCREEN *****');
  }
  ngAfterViewInit(): void {
    AnimationHelper.tween(document.getElementById('container-startscreen'), AnimationEnum.FADE_IN, () => {
      // console.log('intro complete');
    });

    // add generated svg to background. position absolute (centered?)
    // const bodyStyle = getComputedStyle(document.body);
    // const stopColor1 = bodyStyle.getPropertyValue('--main-primary-color');
    // const stopColor2 = bodyStyle.getPropertyValue('--main-secondary-color');
    // const svg = SVGHelper.createSVG(stopColor1, stopColor2);
    // document.getElementById('background-container').appendChild(svg);
  }

  ngAfterViewChecked(): void {
  }
  
  ngAfterContentChecked(): void {
  }

  // LIFE CYCLE end

  public startMatch(humanPlayerCount) {
    AnimationHelper.tween(document.getElementById('container-startscreen'), AnimationEnum.FADE_OUT, () => {
      // console.log('start screen outro complete');
      this.store.dispatch(new Actions.CreateMatch(humanPlayerCount));
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
