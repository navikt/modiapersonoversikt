import { expect, test } from '@playwright/test';

test('Select melding', async ({ page }) => {
    await page.goto('/new/person/meldinger');

    const meldingerList = page.getByRole('region', { name: 'Tråder' });
    await expect(meldingerList).toBeVisible({ timeout: 5000 });
    const meldingerCards = meldingerList.getByTestId('traaditem');
    expect((await meldingerCards.all()).length).toBeGreaterThan(5);

    await meldingerCards.first().getByRole('button').click();

    const meldingerDetails = page.getByRole('region', { name: 'Dialogdetaljer' });

    await expect(meldingerDetails).toBeVisible();
});

test('Send melding i tråd', async ({ page }) => {
    await page.goto('/new/person/meldinger');
    await page.getByTestId('traaditem').nth(2).getByRole('button').click();

    await page.getByRole('button', { name: 'Svar' }).click();

    await page.getByRole('textbox').fill('playwright test melding');
    await page.getByRole('button', { name: 'Send til Aremark' }).click();

    const meldingerList = page.getByLabel('Dialogdetaljer').getByLabel('Meldinger');
    const newMelding = meldingerList.getByText('playwright test melding');

    await expect(newMelding).toBeVisible();
});

test('Send ny melding', async ({ page }) => {
    await page.goto('/new/person/meldinger');

    await page.getByRole('textbox').fill('playwright new melding');
    await page.getByLabel('Temagruppe').selectOption('Pensjon');
    await page.getByRole('button', { name: 'Send til Aremark' }).click();

    const newTraad = page.getByTestId('traaditem').first();
    await expect(newTraad).toContainText('Referat');
    await expect(newTraad).toContainText('Tema:Pensjon');

    await newTraad.getByRole('button').click();

    const meldingerDetails = page.getByRole('region', { name: 'Dialogdetaljer' });
    await expect(meldingerDetails.getByRole('heading').first()).toHaveText('Referat - Pensjon');

    const meldingerList = page.getByLabel('Dialogdetaljer').getByLabel('Meldinger');
    const meldinger = meldingerList.getByRole('list');
    await expect(meldinger).toHaveCount(1);
    await expect(meldinger.first().getByRole('paragraph').first()).toHaveText('playwright new melding');
});
