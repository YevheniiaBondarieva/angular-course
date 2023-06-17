import { LoadingBlockService } from './loading-block.service';

describe('LoadingBlockService', () => {
  let service: LoadingBlockService;

  beforeEach(() => {
    service = new LoadingBlockService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
