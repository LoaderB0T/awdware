import { TestFixture } from 'src/test/test-fixture.spec';
import { RoutingService } from './routing.service';

describe('RoutingService', () => {
  let sut: RoutingService;
  let tf: TestFixture;
  beforeEach(() => {
    tf = new TestFixture();
    sut = new RoutingService(tf.mockRouter);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
