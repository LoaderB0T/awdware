import { TestFixture } from 'src/test/test-fixture.spec';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let sut: SessionService;
  let tf: TestFixture;
  beforeEach(() => {
    tf = new TestFixture();
    sut = new SessionService(tf.mockSessionStoreService, tf.mockWebApiService);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
