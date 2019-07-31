import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'awd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public opened: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public toggleMenu() {
    this.opened = !this.opened;
  }

}
