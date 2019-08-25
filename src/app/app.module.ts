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

@NgModule({
  declarations: [
    AppComponent,
    StartscreenComponent,
    IngameComponent,
    GameoverComponent,
    MenuComponent
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
