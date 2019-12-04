import { ComponentFixture } from '@angular/core/testing';

import { TestHelper } from 'src/test/test-helper.spec';
import { TestFixture } from 'src/test/test-fixture.spec';
import { VerifyMailComponent } from './verify-mail.component';


describe('VerifyMailComponent', () => {
  let testHelper: TestHelper;
  let component: VerifyMailComponent;
  let fixture: ComponentFixture<VerifyMailComponent>;
  let tf: TestFixture;

  beforeEach(() => {
    tf = new TestFixture();
    testHelper = new TestHelper(tf);
    fixture = tf.getFixture<VerifyMailComponent>(VerifyMailComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
