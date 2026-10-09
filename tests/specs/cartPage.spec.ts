import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { CartPage } from '../pages/CartPage';

test('Открытие Cart — приходит ответ 200', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();

  const responsePromise = page.waitForResponse(
    (res) => res.url().includes('/view_cart') && res.request().resourceType() === 'document',
  );

  await mainPage.goToCart();
  const response = await responsePromise;

  expect(response.status()).toBe(200);
});

test('Товар с главной добавляется в корзину', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();

  const productName = await mainPage.getFirstProductName();
  const responsePromise = page.waitForResponse(
    (res) => res.url().includes('/add_to_cart/') && res.request().method() === 'GET',
  );

  await mainPage.addFirstProductToCart();
  const response = await responsePromise;

  expect(response.status()).toBe(200);

  await mainPage.viewCartFromModal();

  const cartPage = new CartPage(page);
  await expect(cartPage.rows).toHaveCount(1);
  await expect(cartPage.rows.first()).toContainText(String(productName));
});

test('Товар удаляется из корзины', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();

  await mainPage.addFirstProductToCart();
  await mainPage.viewCartFromModal();

  const cartPage = new CartPage(page);
  await expect(cartPage.rows).toHaveCount(1);

  await cartPage.deleteFirstItem();
  await expect(cartPage.rows).toHaveCount(0);
  await expect(cartPage.emptyMessage).toBeVisible();
});
