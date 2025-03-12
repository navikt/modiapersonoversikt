import { expect, test } from '@playwright/test';

test('smoketest', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Modia Personoversikt/);
});

test('User pages', async ({ page }) => {
    await page.goto('/person/oversikt');

    const personLoaded = page.getByTestId('visittkort:person');
    await expect(personLoaded).toHaveText(/Aremark Testfamilien/i);
});
