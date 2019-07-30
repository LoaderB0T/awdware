import { TestFixture } from 'src/test/test-fixture.spec';
import { UserInfoResolverService } from './user-info-resolver.service';

describe('UserInfoResolverService', () => {
  let sut: UserInfoResolverService;
  let tf: TestFixture;
  beforeEach(() => {
    tf = new TestFixture();
    sut = new UserInfoResolverService(tf.mockAccountService, tf.mockSessionStoreService, tf.mockSessionService);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
