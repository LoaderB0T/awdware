import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'awd-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor() {
    console.log('GamesComponent constructor called');
  }

  ngOnInit() {
  }

}
