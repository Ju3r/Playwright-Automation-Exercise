import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MainPage extends BasePage {
  private readonly carouselLocator: Locator;
  private readonly categoryLocator: Locator;
  private readonly brandsLocator: Locator;
  private readonly featuresItemsLocator: Locator;
  private readonly recommendedItemsLocator: Locator;
  private readonly footerLocator: Locator;
  private readonly cartModal: Locator;

  protected readonly path = '/';

  constructor(page: Page) {
    super(page);

    this.carouselLocator = this.page.locator('#slider-carousel');
    this.categoryLocator = this.page.locator('.category-products');
    this.brandsLocator = this.page.locator('.brands_products');
    this.featuresItemsLocator = this.page.locator('.features_items');
    this.recommendedItemsLocator = this.page.locator('.recommended_items');
    this.footerLocator = this.page.locator('#footer');
    this.cartModal = this.page.locator('#cartModal');
  }

  async headerHasCorrectAriaSnapshot() {
    await expect(this.headerLocator).toMatchAriaSnapshot({ name: 'headerAriaSnapshot.yml' });
  }

  async carouselHasCorrectAriaSnapshot() {
    await expect(this.carouselLocator).toMatchAriaSnapshot({ name: 'carouselAriaSnapshot.yml' });
  }

  async categoryHasCorrectAriaSnapshot() {
    await expect(this.categoryLocator).toMatchAriaSnapshot({ name: 'categoryAriaSnapshot.yml' });
  }

  async brandsHasCorrectAriaSnapshot() {
    await expect(this.brandsLocator).toMatchAriaSnapshot({ name: 'brandsAriaSnapshot.yml' });
  }

  async featuresItemsHasCorrectAriaSnapshot() {
    await expect(this.featuresItemsLocator).toMatchAriaSnapshot({
      name: 'featuresItemsAriaSnapshot.yml',
    });
  }

  async recommendedItemsHasCorrectAriaSnapshot() {
    await expect(this.recommendedItemsLocator).toMatchAriaSnapshot({
      name: 'recommendedItemsAriaSnapshot.yml',
    });
  }

  async footerHasCorrectAriaSnapshot() {
    await expect(this.footerLocator).toMatchAriaSnapshot({ name: 'footerAriaSnapshot.yml' });
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
