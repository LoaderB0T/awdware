import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translateService: TranslateService) {
  }

  public init() {
    this.translateService.setDefaultLang('en_US');
    this.setLanguage(this.getLanguageId());
  }

  private setLanguage(lenId: string) {
    localStorage.setItem('language', lenId);
    this.translateService.use(lenId);
  }

  private getLanguageId(): string {
    const lenId = localStorage.getItem('language');
    if (lenId && this.isSupportedLanguage(lenId)) {
      return lenId;
    } else {
      return 'en_US';
    }
  }

  private isSupportedLanguage(len: string) {
    return (len === 'en_US'
      || len === 'de_DE');
  }

}
