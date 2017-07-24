import { InventarioFrontendPage } from './app.po';

describe('inventario-frontend App', () => {
  let page: InventarioFrontendPage;

  beforeEach(() => {
    page = new InventarioFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
