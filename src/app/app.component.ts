import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchConfig } from './model/MatchConfig';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { AnimationHelper } from './helper/AnimationHelper';
import { InputService } from './services/input.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'memory-game';
  
  
  private match: Observable<MatchConfig[]>;
  private isCtrlKeyDown = false;
  
  constructor(private store: Store<AppState>, private inputService: InputService) {
    this.store.select('match').subscribe(stats => this.match = stats);
    // console.log(store);
    // console.log(this.allMatchStats);
  }
  
  ngOnInit(): void {
    this.inputService.addInput('control', (isKeyDown: boolean) => {
      console.log('input service updating...', isKeyDown);
      if(isKeyDown) {
        this.isCtrlKeyDown = !this.isCtrlKeyDown;

      }
      // this.isCtrlKeyDown = isKeyDown;
    });

    // add key listener to toggle animated background on and off
    // document.body.addEventListener('keydown', e => {
    //   if (this.isCtrlKey(e.key) && !this.isCtrlKeyDown) {
    //     console.log('key down: ', e.key);
    //     this.isCtrlKeyDown = true;
    //   }
    // });

    // document.body.addEventListener('keyup', e => {
    //   if (this.isCtrlKey(e.key) && this.isCtrlKeyDown) {
    //     console.log('key up: ', e.key);
    //     this.isCtrlKeyDown = false;
    //   }
    // });
  }

  private isCtrlKey(key: string): boolean {
    return key.toLowerCase() === 'control';
  }




  public get backgroundEnabled(): boolean {
    return this.isCtrlKeyDown && AnimationHelper.enableBackgroundAnimations;
  }
}
