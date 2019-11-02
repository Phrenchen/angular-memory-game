import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchConfig } from './model/MatchConfig';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { AnimationHelper } from './helper/AnimationHelper';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'memory-game';


  private match: Observable<MatchConfig[]>;

  constructor(private store: Store<AppState>) {
    this.store.select('match').subscribe(stats => this.match = stats);
    // console.log(store);
    // console.log(this.allMatchStats);
  }

  public get backgroundEnabled(): boolean {
    return AnimationHelper.enableBackgroundAnimations;
  }
}
