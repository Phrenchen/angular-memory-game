import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  @Input() tutorial: string;

  constructor() { }

  ngOnInit() {
    console.log('tut name: ' + this.tutorial);
  }

  public isActive(tutName: string): boolean {
    return tutName === this.tutorial;
  }
}
