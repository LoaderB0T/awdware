import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { FacadeService } from '@awdware/shared';

import { RoutingService } from '../services/routing.service';
const theaterJS = require('theaterjs');

@Component({
  selector: 'awd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _translateService: TranslateService;
  private readonly _routingService: RoutingService;
  private readonly _facadeService: FacadeService;
  private _timeOut: NodeJS.Timeout;

  private readonly _theater = theaterJS({ locale: 'en' });

  constructor(translateService: TranslateService, routingService: RoutingService, facadeService: FacadeService) {
    this._translateService = translateService;
    this._routingService = routingService;
    this._facadeService = facadeService;
  }

  ngOnInit() {
    if (!this._theater.getCurrentActor()) {
      this._timeOut = setTimeout(() => {
        this.startTypingAnimation();
      }, 800);
    } else {
      this._theater.replay();
    }
    this._facadeService.setActiveMenuItem('home');
  }

  ngOnDestroy() {
    this._theater.stop();
    clearTimeout(this._timeOut);
  }

  private startTypingAnimation() {
    const obs_hi = this._translateService.get('home.theater.hi');
    const obs_iam = this._translateService.get('home.theater.iam');
    const obs_ilike = this._translateService.get('home.theater.ilike');

    forkJoin([obs_hi, obs_iam, obs_ilike]).subscribe(x => {
      const [text_hi, text_iam, text_ilike] = x as [string, string, string];

      this._theater
        .addActor('me0', { accuracy: 0.2, speed: 1 }, '#textAnimation0')
        .addActor('me1', { accuracy: 0.2, speed: 1 }, '#textAnimation1')
        .addActor('me2', { accuracy: 1, speed: 1 }, '#textAnimation2')
        .addActor('me3', { accuracy: 1, speed: 1 }, '#textAnimation3')
        .addActor('me4', { accuracy: 0.5, speed: 1 }, '#textAnimation4')
        .addActor('me5', { accuracy: 0.75, speed: 1 }, '#textAnimation5')
        .addActor('me6', { accuracy: 0.5, speed: 1 }, '#textAnimation6')
        .addActor('me7', { accuracy: 0.5, speed: 1 }, '#textAnimation7')
        .addScene(`me0:${text_hi}`, 750)
        .addScene(`me1:<br>${text_iam} `)
        .addScene('me2:Janik', 0)
        .addScene('me3:.<br>', 0)
        .addScene(1111)
        .addScene(`me4:${text_ilike} `, 0)
        .addScene('me5:', 0);
      this.writeLikes(['Web Development', 'TypeScript', 'Angular', 'C# & .NET', 'Automation (CI/CD)']);
      this._theater.addScene('me4:');
      this._theater.addScene(-text_ilike.length);
      this._theater.addScene('me4:Click ');
      this._theater.addScene('me6:here');
      this._theater.addScene('me7: to learn more!');
    });
  }

  private writeLikes(texts: string[]) {
    texts.forEach(text => {
      this._theater.addScene(text, 50).addScene(500).addScene(-text.length);
    });
  }

  public learnMore() {
    this._routingService.navigate('blog');
  }
}
