import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  public readonly searchInputLocator: Locator;
  public readonly searchButtonLocator: Locator;
  public readonly featuresItemsLocator: Locator;
  public readonly productCardsLocator: Locator;

  protected readonly path = '/products';

  constructor(page: Page) {
    super(page);
    this.searchInputLocator = this.page.locator('#search_product');
    this.searchButtonLocator = this.page.locator('#submit_search');
    this.featuresItemsLocator = this.page.locator('.features_items');
    this.productCardsLocator = this.page.locator('.features_items .productinfo');
  }

  async search(query: string) {
    await this.searchInputLocator.fill(query);
    await this.searchButtonLocator.click();
  }

  firstFeatured() {
    return this.featuresItemsLocator.locator('a[data-product-id="1"]').first();
  }

  firstFeaturedView() {
    return this.featuresItemsLocator.locator('a[href="/product_details/1"]').first();
  }
}
