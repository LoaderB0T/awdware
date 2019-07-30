import { TestFixture } from 'src/test/test-fixture.spec';
import { WebApiService } from './web-api.service';

xdescribe('WebApiService', () => {
  let sut: WebApiService;
  let tf: TestFixture;
  beforeEach(() => {
    tf = new TestFixture();
    sut = new WebApiService(null);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
