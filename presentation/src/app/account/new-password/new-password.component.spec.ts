import { ComponentFixture } from '@angular/core/testing';

import { TestHelper } from 'src/test/test-helper.spec';
import { TestFixture } from 'src/test/test-fixture.spec';
import { LoginComponent } from '../login/login.component';


describe('NewPasswordComponent', () => {
  let testHelper: TestHelper;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let tf: TestFixture;

  beforeEach(() => {
    tf = new TestFixture();
    testHelper = new TestHelper(tf);
    fixture = tf.getFixture<LoginComponent>(LoginComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
