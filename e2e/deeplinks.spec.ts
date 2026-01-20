import { expect, test } from '@playwright/test';
import { meldingerTest, sakerTest, ytelserTest } from 'src/app/personside/infotabs/dyplenkeTest/utils-dyplenker-test';
import { INFOTABS } from 'src/app/personside/infotabs/InfoTabEnum';

test('Utbetalinger', async ({ page }) => {
    await page.clock.setFixedTime(new Date(0));
    page.goto('/person/oversikt');
    let activeTab = page.getByRole('tab', { selected: true });

    await expect(activeTab).toHaveText(new RegExp(INFOTABS.OVERSIKT.path, 'i'), {
        timeout: 10000
    });

    const expectedElement = page.getByLabel('Utbetalinger').getByRole('listitem').first();
    const expectedText = await expectedElement.getByRole('paragraph').first().textContent();

    await expectedElement.getByRole('button').click();

    activeTab = page.getByRole('tab', { selected: true });

    await expect(activeTab).toHaveText(new RegExp(INFOTABS.UTBETALING.path, 'i'));

    const activeElement = page.locator(':focus');

    await expect(activeElement).toContainText(expectedText ?? 'Could not find text');
});

test('Saker', async ({ page }) => {
    await page.clock.setFixedTime(new Date(0));
    page.goto('/person/oversikt');
    let activeTab = page.getByRole('tab', { selected: true });
    await expect(activeTab).toHaveText(new RegExp(INFOTABS.OVERSIKT.path, 'i'), {
        timeout: 10000
    });

    const expectedSak = page.locator(`.${sakerTest.sakstema}`).first();
    const expectedSakText = await expectedSak.getByRole('paragraph').first().textContent();

    await expectedSak.getByRole('button').click();

    activeTab = page.getByRole('tab', { selected: true });
    await expect(activeTab).toHaveText(new RegExp(INFOTABS.SAKER.path, 'i'));

    const valgtSak = page.getByLabel('Saksdokumenter').getByRole('heading').first();

    await expect(valgtSak).toHaveText(expectedSakText ?? 'could not find text');
});

test('Meldinger', async ({ page }) => {
    await page.clock.setFixedTime(new Date(0));
    page.goto('/person/oversikt');
    let activeTab = page.getByRole('tab', { selected: true });
    await expect(activeTab).toHaveText(new RegExp(INFOTABS.OVERSIKT.path, 'i'), {
        timeout: 10000
    });

    const melding = page.locator(`.${meldingerTest.oversikt}`).nth(1);
    await melding.getByRole('button').click();

    activeTab = page.getByRole('tab', { selected: true });
    await expect(activeTab).toContainText(new RegExp(INFOTABS.MELDINGER.tittel, 'i'));

    const checkedMelding = page.getByLabel('Velg melding').getByRole('radio', { checked: true });
    const expectedMelding = page.getByLabel('Velg melding').getByRole('radio').nth(1);

    await expect(checkedMelding).toHaveText((await expectedMelding.textContent()) ?? 'Could not find text');
});

test('Ytelser', async ({ page }) => {
    await page.clock.setFixedTime(new Date(0));
    page.goto('/person/oversikt');
    let activeTab = page.getByRole('tab', { selected: true });
    await expect(activeTab).toHaveText(new RegExp(INFOTABS.OVERSIKT.path, 'i'), {
        timeout: 10000
    });

    const ytelse = page.locator(`.${ytelserTest.oversikt}`).nth(1);
    await ytelse.getByRole('button').click();

    activeTab = page.getByRole('tab', { selected: true });
    await expect(activeTab).toContainText(new RegExp(INFOTABS.YTELSER.tittel, 'i'));

    const forventetMarkert = page
        .getByLabel('Velg ytelser')
        .getByRole('listitem')
        .nth(1)
        .locator('button[aria-selected="true"]');

    await expect(forventetMarkert).toBeVisible();
});
