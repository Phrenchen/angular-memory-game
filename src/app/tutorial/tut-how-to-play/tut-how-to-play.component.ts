import { Component, OnInit, Input } from '@angular/core';
import { AbstractTutorial } from '../model/AbstractTutorial';

@Component({
  selector: 'app-tut-how-to-play',
  templateUrl: './tut-how-to-play.component.html',
  styleUrls: ['./tut-how-to-play.component.scss']
})
export class TutHowToPlayComponent extends AbstractTutorial implements OnInit {

  // used in document.querySelector(targetId). expecting single result for each id
  @Input() targetIds: string[] = [];

  constructor() {
    super([]);
   }

  ngOnInit() {
    
  }

}
