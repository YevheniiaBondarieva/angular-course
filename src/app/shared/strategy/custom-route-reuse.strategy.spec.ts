import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

import { CustomRouteReuseStrategy } from './custom-route-reuse.strategy';

describe('CustomRouteReuseStrategy', () => {
  let strategy: CustomRouteReuseStrategy;

  function createActivatedRouteSnapshot(path: string): ActivatedRouteSnapshot {
    return { routeConfig: { path } } as ActivatedRouteSnapshot;
  }

  beforeEach(() => {
    strategy = new CustomRouteReuseStrategy();
  });

  it('should detach specific routes', () => {
    const route = createActivatedRouteSnapshot('courses/1');
    const shouldDetach = strategy.shouldDetach(route);

    expect(shouldDetach).toBe(true);
  });

  it('should not detach other routes', () => {
    const route = createActivatedRouteSnapshot('courses');
    const shouldDetach = strategy.shouldDetach(route);

    expect(shouldDetach).toBe(false);
  });

  it('should store detached route handles', () => {
    const route = createActivatedRouteSnapshot('courses/1');
    const handle: DetachedRouteHandle = {} as DetachedRouteHandle;

    strategy.store(route, handle);
    const shouldAttach = strategy.shouldAttach(route);

    expect(shouldAttach).toBe(true);
  });
  it('should retrieve detached route handles', () => {
    const route = createActivatedRouteSnapshot('courses/1');
    const handle: DetachedRouteHandle = {} as DetachedRouteHandle;

    strategy.store(route, handle);
    const retrievedHandle = strategy.retrieve(route);

    expect(retrievedHandle).toBe(handle);
  });

  it('should not attach if route handle is not in cache', () => {
    const route = createActivatedRouteSnapshot('courses/1');
    const shouldAttach = strategy.shouldAttach(route);

    expect(shouldAttach).toBe(false);
  });

  it('should reuse routes with the same route config', () => {
    const route = createActivatedRouteSnapshot('courses/1');
    const shouldReuse = strategy.shouldReuseRoute(route, route);

    expect(shouldReuse).toBe(true);
  });

  it('should not reuse routes with different route configs', () => {
    const future = createActivatedRouteSnapshot('courses/1');
    const curr = createActivatedRouteSnapshot('courses/2');
    const shouldReuse = strategy.shouldReuseRoute(future, curr);

    expect(shouldReuse).toBe(false);
  });
});
