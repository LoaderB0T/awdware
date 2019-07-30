import { ComponentFixture } from '@angular/core/testing';

import { TestHelper } from 'src/test/test-helper.spec';
import { TestFixture } from 'src/test/test-fixture.spec';
import { TextboxComponent } from './textbox.component';


describe('TextboxComponent', () => {
  let testHelper: TestHelper;
  let component: TextboxComponent;
  let fixture: ComponentFixture<TextboxComponent>;
  let tf: TestFixture;

  beforeEach(() => {
    tf = new TestFixture();
    testHelper = new TestHelper(tf);
    fixture = tf.getFixture<TextboxComponent>(TextboxComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
