import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public items: MenuItem[];
  public activeIndex = 0;

  constructor() { }

  ngOnInit() {
    this.items = [
      { label: 'Start', routerLink: 'start' },
      { label: 'Memory', routerLink: 'memory' },
      { label: 'Game Over', routerLink: 'gameover' }
    ];
  }

}
