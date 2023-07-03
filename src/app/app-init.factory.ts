import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './shared/services/language.service';

export function appInitFactory(
  translateService: TranslateService,
  languageService: LanguageService,
) {
  return () => {
    const selectedLanguage = languageService.getSelectedLanguage();
    if (selectedLanguage) {
      translateService.use(selectedLanguage);
    }
  };
}
