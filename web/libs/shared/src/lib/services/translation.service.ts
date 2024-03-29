import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private readonly translateService: TranslateService) {}

  public init() {
    console.log('TranslationService.init');
    this.translateService.setDefaultLang('en_US');
    this.setLanguage(this.getLanguageId());
  }

  public setLanguage(lenId: LenID) {
    localStorage.setItem('language', lenId);
    this.translateService.use(lenId);
  }

  private getLanguageId(): LenID {
    const lenId = localStorage.getItem('language');
    if (lenId && this.isSupportedLanguage(lenId)) {
      return lenId as LenID;
    } else {
      return 'en_US';
    }
  }

  public get lenID(): LenID {
    return this.getLanguageId();
  }

  private isSupportedLanguage(len: any): boolean {
    return Object.prototype.hasOwnProperty.call(internalLenId, len);
  }
}

export declare type LenID = keyof typeof internalLenId;
const internalLenId = {
  en_US: '',
  de_DE: ''
};
