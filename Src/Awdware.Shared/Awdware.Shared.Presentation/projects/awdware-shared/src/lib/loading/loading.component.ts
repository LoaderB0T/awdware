import { Component, Input } from '@angular/core';

@Component({
  selector: 'awd-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() public scale: number = 1;
  @Input() public color: string = '#FFFFFF';

  public fakeArray = new Array(5);

  constructor() {}

  public get height(): number {
    return 40 * this.scale;
  }

  public get width(): number {
    return 40 * this.scale;
  }

  public get stripeWidth(): number {
    return 6 * this.scale;
  }

  public get margin(): number {
    return 1 * this.scale;
  }
}
