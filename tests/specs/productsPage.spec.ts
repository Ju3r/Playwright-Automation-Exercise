import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test('Открытие Products — приходит ответ 200', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const responsePromise = page.waitForResponse(
    (res) => res.url().includes('/products') && res.request().resourceType() === 'document',
  );

  await productsPage.open();
  const response = await responsePromise;

  expect(response.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
});

test('Поиск товаров по запросу', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.open();

  await productsPage.search('jeans');

  await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
  await expect(productsPage.productCardsLocator.first()).toBeVisible();
  await expect(productsPage.productCardsLocator.first()).toContainText('jean', {
    ignoreCase: true,
  });
});

test('Поиск — клик Submit и ответ со страницей выдачи', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.open();
  await productsPage.searchInputLocator.fill('jeans');

  const responsePromise = page.waitForResponse(
    (res) => res.url().includes('/products') && res.url().includes('search') && res.ok(),
  );

  await productsPage.searchButtonLocator.click();
  const response = await responsePromise;

  expect(response.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
});

test('Карточка товара — клик View Product и ответ 200', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.open();

  const responsePromise = page.waitForResponse(
    (res) => res.url().includes('/product_details/') && res.ok(),
  );

  await productsPage.firstFeaturedView().click();
  const response = await responsePromise;

  expect(response.status()).toBe(200);
  await expect(page.locator('.product-information h2')).toBeVisible();
});
