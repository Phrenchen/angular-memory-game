import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchConfig } from 'src/app/model/MatchConfig';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { IPlayer } from 'src/app/model/IPlayer';
import { AnimationHelper, AnimationConfig, AnimationEnum } from 'src/app/helper/AnimationHelper';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})
export class GameoverComponent implements OnInit, OnDestroy {

  public matchConfig: MatchConfig;
  
  private sortedPlayers: IPlayer [];
  private storeSubscription: any;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('match')
      .subscribe(stats => {
        // console.log('store update ', stats.isGameOver);
        this.matchConfig = stats;
        
        let sortedPlayers = this.matchConfig.players.sort((a, b) => {
          return a.pairsWon - b.pairsWon;
        });
        
        this.sortedPlayers = sortedPlayers.reverse();
        // console.log('sortedPlayers: ', this.sortedPlayers);

      });

      AnimationHelper.tween(document.getElementById('game-over-container'), AnimationEnum.FADE_IN);
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      console.log('unsubscribing');
      this.storeSubscription.unsubscribe();
    }

  }

  public playAgain(): void {
    AnimationHelper.tween(document.getElementById('game-over-container'), AnimationEnum.FADE_OUT, () => {
      // console.log('intro complete');
      this.router.navigate(['/start']);
    });
  }

  public get winnerPlayer(): IPlayer {
    return this.sortedPlayers[0];
  }
}
