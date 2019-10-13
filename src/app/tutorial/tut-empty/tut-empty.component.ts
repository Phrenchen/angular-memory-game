import { Component, OnInit } from '@angular/core';
import { AbstractTutorial } from '../model/AbstractTutorial';

@Component({
  selector: 'app-tut-empty',
  templateUrl: './tut-empty.component.html',
  styleUrls: ['./tut-empty.component.scss']
})
export class TutEmptyComponent extends AbstractTutorial implements OnInit {

  constructor() { 
    super([]);
  }

  ngOnInit() {
  }

}
