import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
const theaterJS = require('theaterjs');
const theater = theaterJS({ locale: 'en' });

@Component({
  selector: 'awd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly _translateService: TranslateService;

  constructor(translateService: TranslateService) {
    this._translateService = translateService;
  }

  ngOnInit() {
    this.startTypingAnimation();
  }

  private startTypingAnimation() {
    const obs_hi = this._translateService.get('home.theater.hi');
    const obs_iam = this._translateService.get('home.theater.iam');
    const obs_ilike = this._translateService.get('home.theater.ilike');

    forkJoin([obs_hi, obs_iam, obs_ilike]).subscribe(x => {
      const [text_hi, text_iam, text_ilike] = x;

      theater
        .addActor('me1', { accuracy: 0.2, speed: 1 }, '#textAnimation1')
        .addActor('me2', { accuracy: 1, speed: 1 }, '#textAnimation2')
        .addActor('me3', { accuracy: 1, speed: 1 }, '#textAnimation3')
        .addActor('me4', { accuracy: 0.5, speed: 1 }, '#textAnimation4')
        .addActor('me5', { accuracy: 0.75, speed: 1 }, '#textAnimation5')
        .addActor('me6', { accuracy: 0.5, speed: 1 }, '#textAnimation6')
        .addScene(`me1:${text_hi}<br>`, `${text_iam} `, 500)
        .addScene('me2:Janik', 0)
        .addScene('me3:.<br>', 0)
        .addScene(`me4:${text_ilike} `, 0)
        .addScene('me5: ', 0);
      this.writeLikes([
        'Web Development',
        // "TypeScript",
        // "Angular",
        // "C# & .NET Core",
        // "Tinkering with (S)CSS",
      ]);
      theater.addScene('me6:lots actually!');
    });
  }

  private writeLikes(texts: string[]) {
    texts.forEach(text => {
      theater
        .addScene(text, 50)
        .addScene(500)
        .addScene(-text.length);
    });
  }

  public doStuff() {
    alert('did stuff!');
  }

}
