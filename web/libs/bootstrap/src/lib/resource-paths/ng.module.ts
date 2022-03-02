import { NgModule } from '@angular/core';
import { ResourcePipe } from './resource.pipe';

@NgModule({
  declarations: [ResourcePipe],
  exports: [ResourcePipe]
})
export class TestModule {}
