import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { AccountFormPage } from '../pages/AccountFormPage';
import { createUser } from '../data/user';
import { faker } from '@faker-js/faker';

let authPage: AuthPage;

test.describe('Тесты страницы авторизации', async () => {
  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.openPage();
  });

  test('Логин и логаут', async ({ page }) => {
    const user = createUser();
    const accountForm = new AccountFormPage(page);

    await authPage.startSignup(user);
    await accountForm.submitUserInformation(user);
    await accountForm.continueToHome();
    await expect(authPage.loggedInAs(user.firstName)).toBeVisible();

    await authPage.logout();
    await expect(authPage.loggedOut()).toBeVisible();

    await authPage.login(user.email, user.password);
    await expect(authPage.loggedInAs(user.firstName)).toBeVisible();
  });

  test('Регистрация нового пользователя', async ({ page }) => {
    const user = createUser();
    const accountForm = new AccountFormPage(page);

    await authPage.startSignup(user);
    await accountForm.submitUserInformation(user);
    await accountForm.continueToHome();

    await expect(authPage.loggedInAs(user.firstName)).toBeVisible();
  });

  test('Неверный логин — POST /login и ошибка на странице', async ({ page }) => {
    await authPage.loginEmail.fill(String(faker.internet.email()));
    await authPage.loginPassword.fill(String(faker.internet.password({ length: 12 })));

    const responsePromise = page.waitForResponse(
      (res) => res.url().includes('/login') && res.request().method() === 'POST',
    );

    await authPage.loginButton.click();

    expect((await responsePromise).status()).toBe(200);
    await expect(authPage.loginError).toBeVisible();
  });
});
