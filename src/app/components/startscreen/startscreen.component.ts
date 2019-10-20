import { Component, OnInit, Input, AfterContentChecked, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as Actions from './../../actions/match.actions';
import { Router } from '@angular/router';
import { AnimationConfig, AnimationEnum, AnimationHelper } from 'src/app/helper/AnimationHelper';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit, AfterContentChecked, AfterViewChecked, AfterViewInit {
  
  // LIFE CYCLE
  constructor(private router: Router, private store: Store<AppState>) { }
  
  ngOnInit() {  
    console.log('***** INIT START SCREEN *****');
  }
  ngAfterViewInit(): void {
    AnimationHelper.tween(document.getElementById('container-startscreen'), AnimationConfig.getConfig(AnimationEnum.FADE_IN), () => {
      console.log('intro complete');
    });
  }

  ngAfterViewChecked(): void {
  }
  
  ngAfterContentChecked(): void {
  }

  // LIFE CYCLE end

  public startMatch(humanPlayerCount) {
    AnimationHelper.tween(document.getElementById('container-startscreen'), AnimationConfig.getConfig(AnimationEnum.FADE_OUT), () => {
      console.log('start screen outro complete');
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
