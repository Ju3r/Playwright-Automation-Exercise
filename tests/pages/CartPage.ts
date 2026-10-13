import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  protected readonly path = '/view_cart';

  readonly rows: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.rows = this.page.locator('#cart_info tbody tr');
    this.emptyMessage = this.page.getByText('Cart is empty!');
  }

  async deleteFirstItem() {
    await this.page.locator('a.cart_quantity_delete').first().click();
  }
}
