import { TestFixture } from 'src/test/test-fixture.spec';
import { UserDetailsResolverService } from './user-info-resolver.service';

describe('UserInfoResolverService', () => {
  let sut: UserDetailsResolverService;
  let tf: TestFixture;
  beforeEach(() => {
    tf = new TestFixture();
    sut = new UserDetailsResolverService(tf.mockAccountService, tf.mockSessionStoreService, tf.mockSessionService);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
