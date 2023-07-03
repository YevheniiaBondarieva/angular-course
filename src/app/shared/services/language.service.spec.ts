import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let localStorageMock: { [key: string]: string | null };

  beforeEach(() => {
    service = new LanguageService();
    localStorageMock = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => localStorageMock[key],
        setItem: (key: string, value: string) => {
          localStorageMock[key] = value;
        },
      },
      writable: true,
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get selected language from localStorage', () => {
    const language = 'en';
    localStorageMock['selectedLanguage'] = language;
    const selectedLanguage = service.getSelectedLanguage();
    expect(selectedLanguage).toBe(language);
  });

  it('should set selected language in localStorage', () => {
    const language = 'en';
    service.setSelectedLanguage(language);
    expect(localStorageMock['selectedLanguage']).toBe(language);
  });
});
