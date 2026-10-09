import { test, expect } from '@playwright/test';
import { AuthPage, uniqueUser } from '../pages/AuthPage';
import { AccountFormPage } from '../pages/AccountFormPage';

test('Логин и логаут', async ({ page }) => {
  const user = uniqueUser();
  const authPage = new AuthPage(page);
  const accountForm = new AccountFormPage(page);

  await authPage.open();
  await authPage.startSignup(user);
  await accountForm.submit(user);
  await accountForm.continueToHome();
  await expect(authPage.loggedInAs(user.name)).toBeVisible();

  await authPage.logout();
  await expect(authPage.loggedOut()).toBeVisible();

  await authPage.login(user.email, user.password);
  await expect(authPage.loggedInAs(user.name)).toBeVisible();
});

test('Регистрация нового пользователя', async ({ page }) => {
  const user = uniqueUser();
  const authPage = new AuthPage(page);
  const accountForm = new AccountFormPage(page);

  await authPage.open();
  await authPage.startSignup(user);
  await accountForm.submit(user);
  await accountForm.continueToHome();

  await expect(authPage.loggedInAs(user.name)).toBeVisible();
});

test('Неверный логин — POST /login и ошибка на странице', async ({ page }) => {
  const authPage = new AuthPage(page);
  await authPage.open();
  await authPage.loginEmail.fill('wrong@mail.com');
  await authPage.loginPassword.fill('bad-password');

  const responsePromise = page.waitForResponse(
    (res) => res.url().includes('/login') && res.request().method() === 'POST',
  );

  await authPage.loginButton.click();
  const response = await responsePromise;

  expect(response.status()).toBe(200);
  await expect(authPage.loginError).toBeVisible();
});
