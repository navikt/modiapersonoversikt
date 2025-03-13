import { expect, test } from '@playwright/test';

test('Select melding', async ({ page }) => {
    await page.goto('/new/person/meldinger');

    const meldingerList = page.getByRole('region', { name: 'Tråder' });
    await expect(meldingerList).toBeVisible();
    const meldingerCards = meldingerList.getByTestId('traaditem');
    expect((await meldingerCards.all()).length).toBeGreaterThan(5);

    await meldingerCards.first().getByRole('button').click();

    const meldingerDetails = page.getByRole('region', { name: 'Dialogdetaljer' });

    await expect(meldingerDetails).toBeVisible();
});

test('Send melding i tråd', async ({ page }) => {
    await page.goto('/new/person/meldinger');
    const traadToClick = page.getByTestId('traaditem').nth(2);
    await expect(traadToClick).toBeVisible();
    await traadToClick.getByRole('button').click();

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

test('Journalfore dialog', async ({ page }) => {
    // traadId from statiskTraadMock
    await page.goto('/new/person/meldinger?traadId=sg838exr');
    const journalposterTable = page.getByTestId('journalposter-table');
    const journalposter = journalposterTable.getByRole('row');
    await expect(journalposterTable).toBeVisible();
    const existingRows = await journalposter.count();

    await page.getByRole('button', { name: 'Journalfør' }).click();

    const modal = page.getByRole('dialog');
    const submitButton = modal.getByRole('button', { name: 'Journalfør' });
    await expect(submitButton).toBeDisabled();

    const temaRow = modal.getByRole('row', { name: 'Dagpenger' });
    await temaRow.click();
    const sakRow = modal.getByRole('table', { name: 'Saker' }).getByRole('row').first();
    const saksId = (await sakRow.getByRole('rowheader').textContent()) ?? 'Fail';
    await sakRow.click();

    await expect(submitButton).not.toBeDisabled();

    await submitButton.click();
    await expect(modal).not.toBeVisible();

    const newRows = await journalposter.count();

    expect(newRows).toEqual(existingRows + 1);
    await expect(journalposterTable.getByText(saksId)).toBeVisible();
});
test('Autocomplete textarea', async ({ page }) => {
    await page.goto('/new/person');
    const textarea = page.getByRole('textbox');

    await textarea.clear();

    await textarea.pressSequentially('hei ');

    const replacedText = 'Hei, Aremark';
    await expect(textarea).toHaveText(replacedText);
});
