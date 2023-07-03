import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly storageKey = 'selectedLanguage';

  getSelectedLanguage(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  setSelectedLanguage(language: string): void {
    localStorage.setItem(this.storageKey, language);
  }
}
