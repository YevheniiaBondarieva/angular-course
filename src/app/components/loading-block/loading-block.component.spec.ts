import * as angularCore from '@angular/core';

import { LoadingBlockComponent } from './loading-block.component';
import { LoadingBlockService } from '../../shared/services/loading-block.service';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('LoadingBlockComponent', () => {
  let component: LoadingBlockComponent;

  beforeEach(() => {
    const loadingBlockService = jest.fn() as unknown as LoadingBlockService;
    injectSpy.mockReturnValueOnce(loadingBlockService);

    component = new LoadingBlockComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
