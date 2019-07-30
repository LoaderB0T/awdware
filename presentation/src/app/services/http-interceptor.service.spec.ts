import { TestFixture } from 'src/test/test-fixture.spec';
import { HttpInterceptorService } from './http-interceptor.service';

describe('HttpInterceptorService', () => {
  let sut: HttpInterceptorService;
  let tf: TestFixture;
  beforeEach(() => {
    tf = new TestFixture();
    sut = new HttpInterceptorService(tf.mockSessionStoreService);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
