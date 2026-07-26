const fs = require('fs');

fs.mkdirSync('screenshots/playwright', { recursive: true });
const { test, expect } = require('@playwright/test');

const url = 'http://127.0.0.1:5500/Portfolio/index.html';

test('TC01 - Verify Portfolio Homepage Loads', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Aman Kumar/);

  await page.screenshot({
    path: 'screenshots/playwright/homepage.png',
    fullPage: true
  });
});

test('TC02 - Verify Navigation Menu', async ({ page }) => {
  await page.goto(url);

  await expect(page.locator('nav')).toBeVisible();

  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Skills' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
 await expect(page.locator('nav').getByText('Contact')).toBeVisible();
});

test('TC03 - Verify Skills Section', async ({ page }) => {
  await page.goto(url);

  await expect(page.locator('#skills')).toBeVisible();
});

test('TC04 - Verify Projects Section', async ({ page }) => {
  await page.goto(url);

  await expect(page.locator('#projects')).toBeVisible();
});

test('TC05 - Verify Contact Form', async ({ page }) => {
  await page.goto(url);

  await expect(page.locator('#contact')).toBeVisible();

  await page.fill('input[name="name"]', 'Aman Test');
  await page.fill('input[name="email"]', 'aman@test.com');

  const message = page.locator('textarea');
  if (await message.count()) {
    await message.fill('This is a Playwright automation test.');
  }

  await page.screenshot({
    path: 'screenshots/playwright/contact-form.png',
    fullPage: true
  });
});