import { WoopyPocPage } from './app.po';

describe('woopy-poc App', () => {
  let page: WoopyPocPage;

  beforeEach(() => {
    page = new WoopyPocPage();
  });

  it('should display message saying Gestion des tournois !', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Gestion des tournois !');
  });
});
