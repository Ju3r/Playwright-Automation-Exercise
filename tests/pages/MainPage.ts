import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MainPage extends BasePage {
  private readonly featuresItemsLocator: Locator;
  private readonly cartModal: Locator;

  protected readonly path = '/';

  constructor(page: Page) {
    super(page);
    this.featuresItemsLocator = this.page.locator('.features_items');
    this.cartModal = this.page.locator('#cartModal');
  }

  async addFirstProductToCart() {
    await this.firstProductAddToCart().click();
    await this.cartModal.waitFor({ state: 'visible' });
  }

  async viewCartFromModal() {
    await this.cartModal.getByRole('link', { name: 'View Cart' }).click();
  }

  async getFirstProductName() {
    return (await this.firstProductName().innerText()).trim();
  }

  firstProductAddToCart() {
    return this.featuresItemsLocator.locator('a[data-product-id="1"]').first();
  }

  firstProductName() {
    return this.featuresItemsLocator.locator('.productinfo p').first();
  }

  firstProductView() {
    return this.featuresItemsLocator.locator('a[href="/product_details/1"]').first();
  }
}
