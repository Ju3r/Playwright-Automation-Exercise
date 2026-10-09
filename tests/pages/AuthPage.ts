import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { AccountUser } from '../types/AccountUser';

export class AuthPage extends BasePage {
  protected readonly path = '/login';

  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly loginError: Locator;

  constructor(page: Page) {
    super(page);
    this.signupName = this.page.locator('[data-qa="signup-name"]');
    this.signupEmail = this.page.locator('[data-qa="signup-email"]');
    this.signupButton = this.page.locator('[data-qa="signup-button"]');
    this.loginEmail = this.page.locator('[data-qa="login-email"]');
    this.loginPassword = this.page.locator('[data-qa="login-password"]');
    this.loginButton = this.page.locator('[data-qa="login-button"]');
    this.loginError = this.page.getByText('Your email or password is incorrect!');
  }

  async startSignup(user: AccountUser) {
    await this.signupName.fill(user.firstName);
    await this.signupEmail.fill(user.email);
    await this.signupButton.click();
  }

  async login(email: string, password: string) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }
}
