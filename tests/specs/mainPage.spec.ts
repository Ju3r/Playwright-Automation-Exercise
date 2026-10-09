import test, { expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';

let mainPage: MainPage;

test.describe('Тесты UI главной страницы', async () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.open();
  });

  test('Проверка доступности элементов header', async () => {
    await mainPage.headerHasCorrectAriaSnapshot();
  });

  test('Проверка доступности элементов carousel', async () => {
    await mainPage.carouselHasCorrectAriaSnapshot();
  });

  test('Проверка доступности элементов category', async () => {
    await mainPage.categoryHasCorrectAriaSnapshot();
  });

  test('Проверка доступности элементов brands', async () => {
    await mainPage.brandsHasCorrectAriaSnapshot();
  });

  test('Проверка доступности элементов features items', async () => {
    await mainPage.featuresItemsHasCorrectAriaSnapshot();
  });

  test('Проверка доступности элементов recommended items', async () => {
    await mainPage.recommendedItemsHasCorrectAriaSnapshot();
  });

  test('Проверка доступности элементов footer', async () => {
    await mainPage.footerHasCorrectAriaSnapshot();
  });
});

test('Переход в детальную информацию товара', async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.open();

  const productName = await mainPage.getFirstProductName();

  await mainPage.firstProductView().click();

  await expect(page.locator('.product-information h2')).toContainText(String(productName));
});
