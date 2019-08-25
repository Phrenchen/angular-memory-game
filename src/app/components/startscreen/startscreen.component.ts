import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as Actions from './../../actions/match.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {

  public selectedHumanPlayerCount = 1;



  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
  }

  public startMatch() {
    console.log('startMatch', this.selectedHumanPlayerCount);
    this.store.dispatch(new Actions.SetHumanPlayerCount(this.selectedHumanPlayerCount));

    this.router.navigate(['/memory']);
  }




  // ----------------------------------------------------
  // TODO: MOVE TO Helper class!
  private loadImage(file, imagePool: any[]) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      imagePool.push(reader.result);
    };
  }
}
