import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/notes');
  }

  getParagraphText() {
    return element(by.css('app-notes h2')).getText();
  }
}
