import { Provider } from '@angular/core';
import { Routes } from '@angular/router';

export class AwdwareFacade {
  public baseModuleName: string;
  public apiUrl?: string;
  public test?: boolean = false;
  public isEntryComponent?: boolean = false;
  public provider?: Provider[];
}
