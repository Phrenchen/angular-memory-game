import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-selection',
  templateUrl: './card-selection.component.html',
  styleUrls: ['./card-selection.component.scss']
})
export class CardSelectionComponent implements OnInit {

  @Input() cardUrls: string [];

  constructor() { }

  ngOnInit() {
  }

}
