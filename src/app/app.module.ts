import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { IngameComponent } from './ingame/ingame.component';
import { GameoverComponent } from './gameover/gameover.component';
import { MenuComponent } from './menu/menu.component';

import { StepsModule } from 'primeng/steps';

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
    StepsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
