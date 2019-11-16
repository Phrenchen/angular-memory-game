import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/match.reducer';

import { AppComponent } from './app.component';
import { StartscreenComponent } from './components/startscreen/startscreen.component';
import { IngameComponent } from './components/ingame/ingame.component';
import { GameoverComponent } from './components/gameover/gameover.component';
import { MenuComponent } from './components/menu/menu.component';

import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';

import { CardModule } from 'primeng/card';
import { PlayerInfoComponent } from './components/ingame/player-info/player-info.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { TutHowToPlayComponent } from './tutorial/tut-how-to-play/tut-how-to-play.component';
import { TutEmptyComponent } from './tutorial/tut-empty/tut-empty.component';
import { TutGameRulesComponent } from './tutorial/tut-game-rules/tut-game-rules.component';
import { MemoryCardComponent } from './components/ingame/memory-card/memory-card.component';
import { AnimatedBackgroundComponent } from './components/animated-background/animated-background.component';
import { CardSelectionComponent } from './components/card-selection/card-selection.component';
import { TimeLineComponent } from './components/time-line/time-line.component';

@NgModule({
  declarations: [
    AppComponent,
    StartscreenComponent,
    IngameComponent,
    GameoverComponent,
    MenuComponent,
    PlayerInfoComponent,
    TutorialComponent,
    TutHowToPlayComponent,
    TutEmptyComponent,
    TutGameRulesComponent,
    MemoryCardComponent,
    AnimatedBackgroundComponent,
    CardSelectionComponent,
    TimeLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      match: reducer
    }),
    StepsModule,
    RadioButtonModule,
    FormsModule,
    CardModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
