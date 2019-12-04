import { ComponentFixture } from '@angular/core/testing';

import { TestHelper } from 'src/test/test-helper.spec';
import { TestFixture } from 'src/test/test-fixture.spec';
import { RegisterComponent } from './register.component';


describe('RegisterComponent', () => {
  let testHelper: TestHelper;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let tf: TestFixture;

  beforeEach(() => {
    tf = new TestFixture();
    testHelper = new TestHelper(tf);
    fixture = tf.getFixture<RegisterComponent>(RegisterComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
