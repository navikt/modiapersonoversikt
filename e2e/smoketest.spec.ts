import { AxeBuilder } from '@axe-core/playwright';
import { expect, type Page, type Route, test } from '@playwright/test';
import { FeatureToggles } from '../src/components/featureToggle/toggleIDs';
import { mockFeatureToggle } from '../src/mock/featureToggle-mock';

async function openRepresentationScenario(
    page: Page,
    path: string,
    scenario: 'normal' | 'http-error' | 'home-disabled'
) {
    // Register scenarios on the shared MSW worker before the app's first queries.
    const entryRequested = Promise.withResolvers<void>();
    let entryRoute: Route | undefined;
    const pauseEntry: Parameters<Page['route']>[1] = (route) => {
        entryRoute = route;
        entryRequested.resolve();
    };
    await page.route('**/src/main.tsx', pauseEntry);
    try {
        await page.goto(path, { waitUntil: 'commit' });
        await entryRequested.promise;
        await page.waitForFunction(() => typeof Reflect.get(window, '$RefreshReg$') === 'function');
        await page.evaluate(
            async ({ modulePath, polyfillsPath, scenario, toggles }) => {
                await import(polyfillsPath);
                const { worker, http, HttpResponse }: typeof import('../src/mock/browser') = await import(modulePath);
                worker.events.on('request:start', ({ request }) => {
                    if (new URL(request.url).pathname.endsWith('/rest/person/representasjonsoppdrag')) {
                        console.info('representasjonsoppdrag-kall');
                    }
                });
                if (scenario === 'http-error') {
                    worker.use(
                        http.post('*/rest/person/representasjonsoppdrag', () =>
                            HttpResponse.json({ message: 'Testfeil' }, { status: 503 })
                        )
                    );
                }
                if (scenario === 'home-disabled') {
                    worker.use(http.get('*/rest/featuretoggle', () => HttpResponse.json(toggles)));
                }
            },
            {
                modulePath: '/src/mock/browser.ts',
                polyfillsPath: '/src/extra-polyfills.ts',
                scenario,
                toggles: Object.fromEntries(
                    Object.values(FeatureToggles).map((toggle) => [
                        toggle,
                        toggle === FeatureToggles.NyOversiktDesign ? false : mockFeatureToggle(toggle)
                    ])
                )
            }
        );
    } finally {
        if (entryRoute) {
            await entryRoute.continue();
        }
        await page.unroute('**/src/main.tsx', pauseEntry);
    }
}

test.describe('Gammel oversikt', () => {
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

        await expect(page).toHaveTitle(/Modia personoversikt/);
    });

    test('User pages', async ({ page }) => {
        await page.goto('/person/oversikt');

        const personLoaded = page.getByTestId('visittkort:person');
        await expect(personLoaded).toHaveText(/Aremark Testfamilien/i);
    });

    test('Representasjon starter ikke det nye oppslaget i legacy-visningen', async ({ page }) => {
        const kall: string[] = [];
        page.on('console', (melding) => {
            if (melding.text() === 'representasjonsoppdrag-kall') {
                kall.push(melding.text());
            }
        });
        await openRepresentationScenario(page, '/person/oversikt', 'normal');
        await expect(page).toHaveURL(/\/person\/oversikt(?:[?#]|$)/);
        await expect(page.getByTestId('visittkort:person')).toContainText(/Aremark Testfamilien/i);
        await page.waitForLoadState('networkidle');
        await expect(page.getByRole('heading', { name: 'Er verge for', exact: true })).toHaveCount(0);
        expect(kall).toEqual([]);
    });
});

test.describe('Representasjon på ny hjemside', () => {
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
        test(`viser begge retninger med tastatur og uten UU-brudd ved ${width} piksler`, async ({ page }) => {
            await page.setViewportSize({ width, height: 1000 });
            await page.goto('/new/person/hjem');
            const verge = page.getByRole('region', { name: 'Er verge for', exact: true });
            const fullmakt = page.getByRole('region', { name: 'Har fullmakt for', exact: true });
            const detaljer = verge.getByRole('button', { name: 'Testperson Vergehaver Aktiv' });
            await expect(detaljer).toBeVisible();
            await expect(detaljer.getByText('Aktiv', { exact: true })).toHaveAttribute('data-color', 'success');
            await expect(fullmakt.getByRole('button', { name: 'Testperson Fullmaktsgiver Aktiv' })).toBeVisible();
            await detaljer.focus();
            await detaljer.press('Enter');
            await expect(verge.getByText('Vergemålstype: VOKSEN')).toBeVisible();
            await expect(verge.getByText('Skriverettigheter: arbeidsavklaringspenger')).toBeVisible();
            const fullmaktsgiver = fullmakt.getByRole('button', { name: 'Testperson Fullmaktsgiver Aktiv' });
            await fullmaktsgiver.focus();
            await fullmaktsgiver.press('Enter');
            await expect(fullmakt.getByText('Leserettigheter: dagpenger')).toBeVisible();
            const skjult = fullmakt.getByRole('button', { name: 'Personopplysninger skjult Historisk' });
            await expect(skjult.getByText('Historisk', { exact: true })).toHaveAttribute('data-color', 'neutral');
            await skjult.click();
            const skjultInnhold = fullmakt
                .locator('.aksel-accordion__item')
                .filter({ has: page.getByRole('button', { name: 'Personopplysninger skjult Historisk' }) })
                .locator('.aksel-accordion__content');
            await expect(skjult).toHaveAttribute('aria-expanded', 'true');
            await expect(skjultInnhold.getByText('Personopplysninger skjult', { exact: true })).toBeVisible();
            await expect(skjultInnhold.getByRole('button', { name: /kopier/i })).toHaveCount(0);
            const resultat = await new AxeBuilder({ page })
                .include('section[aria-label="Er verge for"]')
                .include('section[aria-label="Har fullmakt for"]')
                .analyze();
            expect(resultat.violations).toEqual([]);
            for (const region of [verge, fullmakt]) {
                const posisjon = await region.boundingBox();
                if (!posisjon) {
                    throw new Error('Representasjonslistene må være synlige for å kontrollere bredden');
                }
                expect(posisjon.x).toBeGreaterThanOrEqual(0);
                expect(posisjon.x + posisjon.width).toBeLessThanOrEqual(width);
                expect(await region.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
                const navn = region.getByRole('paragraph').filter({ hasText: /^Testperson / });
                const kopier = region.getByRole('button', { name: /^Kopier f\.nr\./ });
                await expect(navn).toBeVisible();
                await expect(kopier).toBeVisible();
                const navnPosisjon = await navn.boundingBox();
                const kopierPosisjon = await kopier.boundingBox();
                if (!navnPosisjon || !kopierPosisjon) {
                    throw new Error('Navn og kopieringsknapp må være synlige for å kontrollere plasseringen');
                }
                expect(kopierPosisjon.x).toBeCloseTo(navnPosisjon.x, 1);
                expect(kopierPosisjon.y).toBeGreaterThanOrEqual(navnPosisjon.y + navnPosisjon.height);
                expect(kopierPosisjon.width).toBeLessThan(posisjon.width);
            }
            await fullmaktsgiver.press('Enter');
            await expect(fullmakt.getByText('Leserettigheter: dagpenger')).not.toBeVisible();
            await expect(fullmaktsgiver).toBeFocused();
            await detaljer.press('Enter');
            await expect(verge.getByText('Vergemålstype: VOKSEN')).not.toBeVisible();
        });
    }

    test('lar saksbehandler prøve igjen etter HTTP-feil uten å skjule eksisterende innhold', async ({ page }) => {
        await openRepresentationScenario(page, '/new/person/hjem', 'http-error');
        const representasjon = page.locator('section').filter({
            has: page.getByRole('heading', { name: 'Representasjon og rettslig handleevne', exact: true })
        });
        const feil = representasjon.getByText('Kunne ikke hente hvem personen er verge eller har fullmakt for.');
        await expect(feil).toBeVisible();
        await expect(representasjon.getByRole('heading', { name: 'Fullmektige', exact: true })).toBeVisible();
        await page.evaluate(async (modulePath) => {
            const { worker }: typeof import('../src/mock/browser') = await import(modulePath);
            worker.resetHandlers();
        }, '/src/mock/browser.ts');
        await representasjon.getByRole('button', { name: 'Prøv igjen' }).click();
        await expect(feil).not.toBeVisible();
        await expect(representasjon.getByRole('button', { name: 'Prøv igjen' })).toHaveCount(0);
        await expect(representasjon.getByRole('heading', { name: 'Fullmektige', exact: true })).toBeVisible();
        await expect(page.getByRole('region', { name: 'Er verge for', exact: true })).toBeVisible();
        await expect(page.getByRole('region', { name: 'Har fullmakt for', exact: true })).toBeVisible();
    });

    test('starter ikke det nye oppslaget i ny oversikt eller når Hjem er slått av', async ({ page }) => {
        const kall: string[] = [];
        page.on('console', (melding) => {
            if (melding.text() === 'representasjonsoppdrag-kall') {
                kall.push(melding.text());
            }
        });
        for (const scenario of ['normal', 'home-disabled'] as const) {
            const path = scenario === 'normal' ? '/new/person/oversikt' : '/new/person/hjem';
            await openRepresentationScenario(page, path, scenario);
            await expect(page).toHaveURL(/\/new\/person\/oversikt(?:[?#]|$)/);
            await expect(page.getByTestId('person-route')).toBeVisible();
            await page.waitForLoadState('networkidle');
            await expect(page.getByRole('heading', { name: 'Er verge for', exact: true })).toHaveCount(0);
            await expect(page.getByRole('heading', { name: 'Har fullmakt for', exact: true })).toHaveCount(0);
            if (scenario === 'home-disabled') {
                await expect(page.getByRole('link', { name: /^Hjem/ })).toHaveCount(0);
            }
        }
        expect(kall).toEqual([]);
    });
});

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
