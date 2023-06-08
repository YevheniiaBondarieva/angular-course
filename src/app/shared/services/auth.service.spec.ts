import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let localStorageMock: { [key: string]: string | null };

  beforeEach(() => {
    localStorageMock = {};
    service = new AuthService();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => localStorageMock[key],
        setItem: (key: string, value: string) => {
          localStorageMock[key] = value;
        },
        removeItem: (key: string) => {
          delete localStorageMock[key];
        },
      },
      writable: true,
    });

    jest.spyOn(service.statusChanged, 'emit');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when login is called', () => {
    service.login('test@example.com', 'password');

    expect(service.statusChanged.emit).toHaveBeenCalledWith(true);
  });

  it('should emit false when logout is called', () => {
    service.logout();

    expect(service.statusChanged.emit).toHaveBeenCalledWith(false);
  });

  it('should return true when isAuthenticated and token exists in localStorage', () => {
    localStorageMock['token'] = 'testToken';
    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBe(true);
  });

  it('should return false when isAuthenticated and token does not exist in localStorage', () => {
    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBe(false);
  });

  it('should return user info when getUserInfo is called with matching email', () => {
    const email = 'test@example.com';
    const password = 'password';
    localStorageMock['user'] = JSON.stringify({ email, password });
    const userInfo = service.getUserInfo();

    expect(userInfo).toEqual({ email, password });
  });
});
