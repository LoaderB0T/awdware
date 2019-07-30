import { ComponentFixture } from '@angular/core/testing';

import { TestHelper } from 'src/test/test-helper.spec';
import { TestFixture } from 'src/test/test-fixture.spec';

import { LoginHelpComponent } from './login-help.component';

xdescribe('LoginHelpComponent', () => {
  let testHelper: TestHelper;
  let component: LoginHelpComponent;
  let fixture: ComponentFixture<LoginHelpComponent>;
  let tf: TestFixture;

  beforeEach(() => {
    tf = new TestFixture();
    testHelper = new TestHelper(tf);
    fixture = tf.getFixture<LoginHelpComponent>(LoginHelpComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
