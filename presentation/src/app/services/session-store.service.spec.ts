import { TestFixture } from 'src/test/test-fixture.spec';
import { SessionStoreService } from './session-store.service';

describe('SessionStoreService', () => {
  let sut: SessionStoreService;
  let tf: TestFixture;
  beforeEach(() => {
    tf = new TestFixture();
    sut = new SessionStoreService();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
