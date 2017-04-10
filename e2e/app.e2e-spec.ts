import { WoopyPocPage } from './app.po';

describe('woopy-poc App', () => {
  let page: WoopyPocPage;

  beforeEach(() => {
    page = new WoopyPocPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
