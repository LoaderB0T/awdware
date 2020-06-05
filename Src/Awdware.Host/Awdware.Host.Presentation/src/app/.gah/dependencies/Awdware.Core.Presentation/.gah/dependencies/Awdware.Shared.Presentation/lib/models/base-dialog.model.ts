import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class BaseDialog {
  public dialogId: string;
  protected $closeDialog = new Subject();
  public closeDialog = this.$closeDialog.asObservable().pipe(map(() => this.dialogId));
}
