import { Subject } from 'rxjs';

export abstract class BaseDialog {
  protected $closeDialog = new Subject();
  public closeDialog = this.$closeDialog.asObservable();
}
