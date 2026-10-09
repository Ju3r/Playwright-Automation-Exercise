import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  protected abstract readonly path: string;
  protected readonly page: Page;
  protected readonly headerLocator: Locator;
  protected readonly baseUrl: string = 'https://automationexercise.com';

  constructor(page: Page) {
    this.page = page;
    this.headerLocator = this.page.locator('#header');
  }

  async open() {
    await this.page.goto(`${this.baseUrl}${this.path}`, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  }

  async logout() {
    await this.headerLocator.getByRole('link', { name: 'Logout' }).click();
  }

  async goToProducts() {
    await this.headerLocator.getByRole('link', { name: 'Products' }).click();
  }

  async goToCart() {
    await this.headerLocator.getByRole('link', { name: 'Cart' }).click();
  }

  loggedInAs(name: string) {
    return this.headerLocator.getByText(`Logged in as ${name}`);
  }

  loggedOut() {
    return this.headerLocator.getByRole('link', { name: 'Signup / Login' });
  }
}
