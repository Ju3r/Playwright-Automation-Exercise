import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

type AccountUser = {
  password: string;
};

export class AccountFormPage extends BasePage {
  protected readonly path = '/signup';

  readonly genderMr: Locator;
  readonly password: Locator;
  readonly days: Locator;
  readonly months: Locator;
  readonly years: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobile: Locator;
  readonly createAccount: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.genderMr = this.page.locator('#id_gender1');
    this.password = this.page.locator('[data-qa="password"]');
    this.days = this.page.locator('[data-qa="days"]');
    this.months = this.page.locator('[data-qa="months"]');
    this.years = this.page.locator('[data-qa="years"]');
    this.firstName = this.page.locator('[data-qa="first_name"]');
    this.lastName = this.page.locator('[data-qa="last_name"]');
    this.address = this.page.locator('[data-qa="address"]');
    this.country = this.page.locator('[data-qa="country"]');
    this.state = this.page.locator('[data-qa="state"]');
    this.city = this.page.locator('[data-qa="city"]');
    this.zipcode = this.page.locator('[data-qa="zipcode"]');
    this.mobile = this.page.locator('[data-qa="mobile_number"]');
    this.createAccount = this.page.locator('[data-qa="create-account"]');
    this.continueButton = this.page.locator('[data-qa="continue-button"]');
  }

  async fill(user: AccountUser) {
    await this.genderMr.check();
    await this.password.fill(user.password);
    await this.days.selectOption('1');
    await this.months.selectOption('1');
    await this.years.selectOption('1990');
    await this.firstName.fill('Test');
    await this.lastName.fill('User');
    await this.address.fill('Street 1');
    await this.country.selectOption('Canada');
    await this.state.fill('ON');
    await this.city.fill('Toronto');
    await this.zipcode.fill('A1A1A1');
    await this.mobile.fill('1234567890');
  }

  async submit(user: AccountUser) {
    await this.fill(user);
    await this.createAccount.click();
  }

  async continueToHome() {
    await this.continueButton.click();
  }
}
