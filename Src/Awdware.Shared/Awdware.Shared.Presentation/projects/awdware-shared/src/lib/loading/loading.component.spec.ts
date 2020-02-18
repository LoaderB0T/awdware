import { ComponentFixture } from '@angular/core/testing';

import { TestHelper } from 'src/test/test-helper.spec';
import { TestFixture } from 'src/test/test-fixture.spec';
import { LoadingComponent } from './loading.component';


describe('LoadingComponent', () => {
  let testHelper: TestHelper;
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let tf: TestFixture;

  beforeEach(() => {
    tf = new TestFixture();
    testHelper = new TestHelper(tf);
    fixture = tf.getFixture<LoadingComponent>(LoadingComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
