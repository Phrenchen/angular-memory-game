import { Component, OnInit, Input } from '@angular/core';
import { IPlayer } from 'src/app/model/IPlayer';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit {

  @Input() player: IPlayer;
  @Input() isActive: boolean;

  constructor() { }

  ngOnInit() {
    // console.log(this.player);
  }

}
