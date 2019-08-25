import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.scss']
})
export class IngameComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {

    this.store.select('match').subscribe(stats => console.log(stats));
    
    // create players
  }

}
