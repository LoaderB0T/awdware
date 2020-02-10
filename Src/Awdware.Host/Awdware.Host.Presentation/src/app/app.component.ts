import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public router: Router) {

  }

  ngOnInit(): void {
    let shared;
    import('../../modules/awdware-core-shared').then(m => {
      shared = m;
      console.log(shared);
      this.router.resetConfig(
        [
          { path: 'lazy', component: shared.TextboxComponent },
        ]);

    });


  }
}
