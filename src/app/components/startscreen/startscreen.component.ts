import { Component, OnInit, AfterContentChecked, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as Actions from './../../actions/match.actions';
import { Router } from '@angular/router';
import { AnimationEnum, AnimationHelper } from 'src/app/helper/AnimationHelper';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit, AfterContentChecked, AfterViewChecked, AfterViewInit {
  
  public selectedPlayerCount = 2;

  // LIFE CYCLE
  constructor(private router: Router, private store: Store<AppState>, private imageService: ImageService) { }
  
  ngOnInit() {  
  }
  ngAfterViewInit(): void {
    AnimationHelper.tween(document.getElementById('container-startscreen'), AnimationEnum.FADE_IN, () => {
      // console.log('intro complete');
    });
  }

  ngAfterViewChecked(): void {
  }
  
  ngAfterContentChecked(): void {
  }
  // LIFE CYCLE end

  public get cardUrls(): string[] {
    return this.imageService.imageUrls.slice();
    // const urls: string[] = [];
    // const numImages = 6;
    // const imageBase = './assets/curious_zelda/';
    // let url: string;

    // for(let i=1; i<=numImages; i++) { // image urls start at 1
    //   url = imageBase + 'curious_zelda_' + i + '_portrait.png';
    //   urls.push(url);
    // }

    // return urls;
  }

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
