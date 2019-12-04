import { TestFixture } from 'src/test/test-fixture.spec';
import { ToolbarProviderService } from './toolbar-provider.service';

describe('ToolbarProviderService', () => {
  let sut: ToolbarProviderService;
  let tf: TestFixture;
  beforeEach(() => {
    tf = new TestFixture();
    sut = new ToolbarProviderService(tf.mockEventService);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
