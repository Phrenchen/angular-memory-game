import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/model/Player';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit {

  @Input() player: Player;

  constructor() { }

  ngOnInit() {
    console.log(this.player);
  }

}
