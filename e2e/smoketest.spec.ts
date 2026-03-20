import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        window.localStorage.setItem('ny-modia-v2', String(Number.MAX_SAFE_INTEGER));
        window.localStorage.setItem(
            'modia-innstillinger-mock',
            JSON.stringify({
                sistLagret: '2020-04-07T12:12:54',
                innstillinger: { 'har-sett-oppstart-ny-modia': 'true' }
            })
        );
    });
});

test('smoketest', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Modia Personoversikt/);
});

test('User pages', async ({ page }) => {
    await page.goto('/person/oversikt');

    const personLoaded = page.getByTestId('visittkort:person');
    await expect(personLoaded).toHaveText(/Aremark Testfamilien/i);
});
