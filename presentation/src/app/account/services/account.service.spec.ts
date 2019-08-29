import { TestFixture } from 'src/test/test-fixture.spec';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let sut: AccountService;
  let tf: TestFixture;
  beforeEach(() => {
    tf = new TestFixture();
    sut = new AccountService(
      tf.mockWebApiService,
      tf.mockSessionStoreService,
      tf.mockEventService,
      tf.mockSessionService,
      tf.mockRoutingService
    );
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
