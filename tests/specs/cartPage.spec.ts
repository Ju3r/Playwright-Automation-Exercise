import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { CartPage } from '../pages/CartPage';

let mainPage: MainPage;

test.describe('Тесты страницы корзины', async () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openPage();
  });

  test('Открытие Cart — приходит ответ 200', async ({ page }) => {
    const responsePromise = page.waitForResponse(
      (res) => res.url().includes('/view_cart') && res.request().resourceType() === 'document',
    );

    await mainPage.goToCart();

    expect((await responsePromise).status()).toBe(200);
  });

  test('Товар с главной добавляется в корзину', async ({ page }) => {
    const productName = await mainPage.getFirstProductName();
    const responsePromise = page.waitForResponse(
      (res) => res.url().includes('/add_to_cart/') && res.request().method() === 'GET',
    );

    await mainPage.addFirstProductToCart();

    expect((await responsePromise).status()).toBe(200);

    await mainPage.viewCartFromModal();

    const cartPage = new CartPage(page);
    await expect(cartPage.rows).toHaveCount(1);
    await expect(cartPage.rows.first()).toContainText(String(productName));
  });

  test('Товар удаляется из корзины', async ({ page }) => {
    await mainPage.addFirstProductToCart();
    await mainPage.viewCartFromModal();

    const cartPage = new CartPage(page);
    await expect(cartPage.rows).toHaveCount(1);

    await cartPage.deleteFirstItem();
    await expect(cartPage.rows).toHaveCount(0);
    await expect(cartPage.emptyMessage).toBeVisible();
  });
});
