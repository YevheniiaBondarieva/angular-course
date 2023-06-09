import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private cache = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return (
      route.routeConfig?.path?.startsWith('courses/') ||
      route.routeConfig?.path === 'courses/new'
    );
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.cache.set(route.routeConfig?.path || '', handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && this.cache.has(route.routeConfig.path || '');
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.cache.get(route.routeConfig?.path || '') || null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot,
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
