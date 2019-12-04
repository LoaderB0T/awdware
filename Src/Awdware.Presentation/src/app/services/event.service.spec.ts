import { TestFixture } from 'src/test/test-fixture.spec';
import { EventService } from './event.service';

describe('EventService', () => {
  let sut: EventService;
  let tf: TestFixture;
  beforeEach(() => {
    tf = new TestFixture();
    sut = new EventService();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
