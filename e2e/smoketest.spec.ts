import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Flytting på ny hjemside', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            window.localStorage.setItem('ny-modia-v2', '-1');
            window.localStorage.setItem(
                'modia-innstillinger-mock',
                JSON.stringify({
                    sistLagret: '2020-04-07T12:12:54',
                    innstillinger: { 'har-sett-oppstart-ny-modia': 'true' }
                })
            );
        });
    });

    for (const width of [1440, 600]) {
        test(`viser flytting i modal ved skjermbredde ${width}`, async ({ page }) => {
            await page.setViewportSize({ width, height: 1000 });
            await page.goto('/new/person/hjem');

            const flytting = page
                .locator('section')
                .filter({ has: page.getByRole('heading', { name: 'Flytting', exact: true }) });
            await expect(flytting).toBeVisible();
            await expect(page.getByRole('table', { name: 'Bosteder' })).toHaveCount(0);
            await expect(page.getByRole('table', { name: 'Inn- og Utflytting' })).toHaveCount(0);

            const representasjon = page.getByRole('heading', { name: 'Representasjon og rettslig handleevne' });
            const oppgaver = page.getByRole('heading', { name: 'Oppgaver', exact: true });
            const flyttingPosisjon = await flytting.getByRole('heading', { name: 'Flytting' }).boundingBox();
            const representasjonPosisjon = await representasjon.boundingBox();
            const oppgaverPosisjon = await oppgaver.boundingBox();
            if (!flyttingPosisjon || !representasjonPosisjon || !oppgaverPosisjon) {
                throw new Error('Seksjonene må være synlige for å kontrollere plasseringen');
            }
            expect(flyttingPosisjon.y).toBeGreaterThan(representasjonPosisjon.y);
            expect(flyttingPosisjon.x).toBeCloseTo(representasjonPosisjon.x, 0);
            if (width === 1440) {
                expect(flyttingPosisjon.x).toBeGreaterThan(oppgaverPosisjon.x);
            } else {
                expect(flyttingPosisjon.y).toBeGreaterThan(oppgaverPosisjon.y);
            }

            const bosteder = flytting.getByRole('button', { name: 'Bosteder', exact: true });
            await bosteder.focus();
            await bosteder.press('Enter');
            const dialog = page.getByRole('dialog', { name: 'Bosteder', exact: true });
            await expect(dialog).toBeVisible();
            const bostederTabell = dialog.getByRole('table', { name: 'Bosteder' });
            await expect(bostederTabell).toBeVisible();
            await expect(dialog.getByRole('table')).toHaveCount(1);
            await expect(dialog.getByRole('region')).toHaveCount(0);
            await expect(dialog.getByRole('rowheader').first()).toContainText('Islandsgate 49');
            expect((await new AxeBuilder({ page }).include('dialog').analyze()).violations).toEqual([]);
            const dialogPosisjon = await dialog.boundingBox();
            if (!dialogPosisjon) {
                throw new Error('Modalen må være synlig for å kontrollere bredden');
            }
            expect(dialogPosisjon.x).toBeGreaterThanOrEqual(0);
            expect(dialogPosisjon.x + dialogPosisjon.width).toBeLessThanOrEqual(width);
            if (width === 600) {
                await bostederTabell.focus();
                await expect(bostederTabell).toBeFocused();
                await bostederTabell.press('ArrowRight');
                await expect
                    .poll(() => bostederTabell.evaluate((element) => element.parentElement?.scrollLeft))
                    .toBeGreaterThan(0);
            }
            await dialog.getByRole('button', { name: /lukk/i }).click();
            await expect(dialog).not.toBeVisible();
            await expect(page.getByRole('table', { name: 'Bosteder', includeHidden: true })).toHaveCount(0);
            await expect(bosteder).toBeFocused();

            const utenlandsflytting = flytting.getByRole('button', { name: 'Inn- og utflytting Norge' });
            await utenlandsflytting.press('Enter');
            const utenlandsDialog = page.getByRole('dialog', { name: 'Inn- og utflytting Norge' });
            await expect(utenlandsDialog).toBeVisible();
            await expect(utenlandsDialog.getByRole('table', { name: 'Bosteder' })).toHaveCount(0);
            await expect(utenlandsDialog.getByRole('table', { name: 'Inn- og Utflytting' })).toBeVisible();
            await expect(utenlandsDialog.getByRole('region')).toHaveCount(0);
            expect((await new AxeBuilder({ page }).include('dialog').analyze()).violations).toEqual([]);
            await utenlandsDialog.getByRole('button', { name: /lukk/i }).focus();
            await page.keyboard.press('Escape');
            await expect(utenlandsDialog).not.toBeVisible();
            await expect(page.getByRole('table', { name: 'Inn- og Utflytting', includeHidden: true })).toHaveCount(0);
            await expect(utenlandsflytting).toBeFocused();

            await bosteder.click();
            await expect(dialog).toBeVisible();
            await dialog.getByRole('columnheader', { name: 'Ny adresse', exact: true }).click();
            await expect(dialog).toBeVisible();
            await page.mouse.click(1, 1);
            await expect(dialog).not.toBeVisible();
            await expect(bosteder).toBeFocused();
        });
    }
});
