import { Component, OnInit, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})
export class GameoverComponent implements OnInit, OnDestroy {

  public matchConfig: MatchConfig;

  private sortedPlayers: Player[];
  private storeSubscription: any;

  private _allChoices: CardSelectedEvent[] = [];

  constructor(private router: Router, private store: Store<AppState>, private imageService: ImageService) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('match')
      .subscribe(stats => {
        this.matchConfig = stats;
        
        // add fake events to players if empty
        this.matchConfig.players.forEach(player => {
          if(!player.choices || player.choices.length === 0) {
            // player.choices = SortHelper.sortChoices(FakeDataProvider.createRandomChoices(MathHelper.getRandomInt(2, 10)));
            this._allChoices = this._allChoices.concat(SortHelper.sortChoices(FakeDataProvider.getRealMatch()));
          }
          else {
            // use real data
            this._allChoices = this.allChoices.concat(player.choices);
          }
        });
        
        console.log(this._allChoices);
        // this.printPlayerActions(this.matchConfig.players);
        // console.log('game over: store update ', this.matchConfig);


        let sortedPlayers = this.matchConfig.players.sort((a, b) => {
          return a.pairsWon - b.pairsWon;
        });

        this.sortedPlayers = sortedPlayers.reverse();
        // console.log('sortedPlayers: ', this.sortedPlayers);

      });

    AnimationHelper.tween(document.getElementById('game-over-container'), AnimationEnum.FADE_IN);
  }

  // private printPlayerActions(players: Player[]): void {

  // }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      console.log('unsubscribing');
      this.storeSubscription.unsubscribe();
    }

  }

  // stats
  // public cardEvents(player): CardSelectedEvent[] {
  //   if (!this.matchConfig) {
  //     return this.fakeEvents;
  //   }
  //   else {
  //     return player.choices;
  //   }
  // }
  // stats end

  public playAgain(): void {
    AnimationHelper.tween(document.getElementById('game-over-container'), AnimationEnum.FADE_OUT, () => {
      // console.log('intro complete');
      this.router.navigate(['/start']);
    });
  }

  public get allChoices(): CardSelectedEvent[] {
    return this._allChoices;
  }

  public imageUrl(partnerId: number): string {
    return this.imageService.getUrl(partnerId);
  }

  public get winnerPlayer(): Player {
    return this.sortedPlayers[0];
  }
}
