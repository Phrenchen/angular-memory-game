import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { IngameComponent } from './ingame/ingame.component';
import { GameoverComponent } from './gameover/gameover.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartscreenComponent },
  { path: 'memory', component: IngameComponent},
  { path: 'gameover', component: GameoverComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
