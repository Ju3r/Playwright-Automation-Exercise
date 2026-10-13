import test, { expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';

test('Переход в детальную информацию товара', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openPage();

  const productName = await mainPage.getFirstProductName();

  await mainPage.firstProductView().click();

  await expect(page.locator('.product-information h2')).toContainText(String(productName));
});
