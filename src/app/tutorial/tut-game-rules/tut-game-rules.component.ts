import { Component, OnInit } from '@angular/core';
import { AbstractTutorial } from '../model/AbstractTutorial';

@Component({
  selector: 'app-tut-game-rules',
  templateUrl: './tut-game-rules.component.html',
  styleUrls: ['./tut-game-rules.component.scss']
})
export class TutGameRulesComponent extends AbstractTutorial implements OnInit {

  constructor() {
    super([]);
  }

  ngOnInit() {
  }

}
