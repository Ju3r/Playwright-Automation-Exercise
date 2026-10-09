import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { AccountUser } from '../types/AccountUser';

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

  async fillUserInformation(user: AccountUser) {
    await this.genderMr.check();
    await this.password.fill(user.password);
    await this.days.selectOption(String(user.birthdate.getDate()));
    await this.months.selectOption(String(user.birthdate.getMonth()));
    await this.years.selectOption(String(user.birthdate.getFullYear()));
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.address.fill(user.address);
    await this.country.selectOption(user.country);
    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipcode.fill(user.zipcode);
    await this.mobile.fill(user.mobile);
  }

  async submitUserInformation(user: AccountUser) {
    await this.fillUserInformation(user);
    await this.createAccount.click();
  }

  async continueToHome() {
    await this.continueButton.click();
  }
}
