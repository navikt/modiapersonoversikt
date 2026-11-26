import { expect, type Page, type Route, test } from '@playwright/test';
import type { VarselInfo } from '../src/lib/types/modiapersonoversikt-api';
import { statiskVarselMock } from '../src/mock/varsler/statiskVarselMock';

const varselInnholdNavn = 'Innhold i varselet til brukeren';
const revarselInnholdNavn = 'Innhold i revarselet til brukeren';

async function openVarsel(page: Page, felter: Partial<VarselInfo>) {
    // Registrer scenarioet i MSW før applikasjonens første forespørsler.
    const entryRequested = Promise.withResolvers<void>();
    let entryRoute: Route | undefined;
    const pauseEntry: Parameters<Page['route']>[1] = (route) => {
        entryRoute = route;
        entryRequested.resolve();
    };
    await page.route('**/src/main.tsx', pauseEntry);
    try {
        await page.goto('/new/person/varsler', { waitUntil: 'commit' });
        await entryRequested.promise;
        await page.waitForFunction(() => typeof Reflect.get(window, '$RefreshReg$') === 'function');
        await page.evaluate(
            async ({ modulePath, polyfillsPath, varsel, felter }) => {
                await import(polyfillsPath);
                const { worker, http, HttpResponse }: typeof import('../src/mock/browser') = await import(modulePath);
                worker.use(
                    http.post('*/rest/varsler', () =>
                        HttpResponse.json({
                            feil: [],
                            varsler: [{ ...varsel, eksternVarsling: { ...varsel.eksternVarsling, ...felter } }]
                        })
                    )
                );
            },
            {
                modulePath: '/src/mock/browser.ts',
                polyfillsPath: '/src/extra-polyfills.ts',
                varsel: statiskVarselMock[0],
                felter
            }
        );
    } finally {
        if (entryRoute) await entryRoute.continue();
        await page.unroute('**/src/main.tsx', pauseEntry);
    }

    const rad = page.getByRole('row').filter({ hasText: 'Et nytt samtalereferat er tilgjengelig i din innboks' });
    await rad.getByRole('button').click();
    await expect(page.getByRole('region', { name: varselInnholdNavn })).toBeVisible();
}

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

test('viser HTML-formatering for e-post, men beholder tittelen som klartekst', async ({ page }) => {
    await openVarsel(page, {
        kanal: 'EPOST',
        tittel: '<b>Tittel</b>',
        tekst: '<p>Hei <strong>du</strong> &amp; velkommen</p><p>Husk:</p><ul><li>Svar oss</li></ul>'
    });

    const innhold = page.getByRole('region', { name: varselInnholdNavn });
    await expect(innhold.getByText('<b>Tittel</b>')).toBeVisible();
    await expect(innhold.locator('strong')).toHaveText('du');
    await expect(innhold).toContainText('Hei du & velkommen');
    await expect(innhold.getByRole('listitem')).toHaveText('Svar oss');
});

test('fjerner aktivt innhold, ressurser, lenker og attributter fra HTML i e-post', async ({ page }) => {
    const eksterneForesporsler: string[] = [];
    page.on('request', (request) => {
        if (request.url().startsWith('https://example.com/')) eksterneForesporsler.push(request.url());
    });
    let dialogVist = false;
    page.on('dialog', async (dialog) => {
        dialogVist = true;
        await dialog.dismiss();
    });
    await openVarsel(page, {
        kanal: 'EPOST',
        tekst: `<style>body { display: none; }</style>
            <script>alert('test')</script>
            <p onclick="alert(1)" style="position:fixed" class="overlay" id="app"
               data-test="verdi" aria-label="Falsk tekst">Trygg tekst</p>
            <img src="https://example.com/tracking" onerror="alert(1)">
            <iframe src="https://example.com/iframe"></iframe>
            <svg onload="alert(1)"><circle /></svg>
            <a href="javascript:alert(1)">Lenketekst</a>
            <a href="https://example.com/link">Ekstern lenke</a>
            <form action="https://example.com/form"><input name="secret"></form>`
    });

    const innhold = page.getByRole('region', { name: varselInnholdNavn });
    await expect(innhold.getByText('Trygg tekst')).toBeVisible();
    await expect(innhold).toContainText('Lenketekst');
    await expect(innhold).toContainText('Ekstern lenke');
    await expect(innhold).not.toContainText("alert('test')");
    await expect(innhold.locator('script, style, img, iframe, svg, a, form, input')).toHaveCount(0);
    expect(await innhold.getByText('Trygg tekst').evaluate((element) => element.getAttributeNames())).toEqual([]);
    expect(eksterneForesporsler).toEqual([]);
    expect(dialogVist).toBe(false);
});

for (const scenario of [
    { kanal: 'SMS', renotifikasjonKanal: 'EPOST', originalHtml: false, revarselHtml: true },
    { kanal: 'EPOST', renotifikasjonKanal: 'SMS', originalHtml: true, revarselHtml: false },
    { kanal: 'EPOST', renotifikasjonKanal: null, originalHtml: true, revarselHtml: false }
]) {
    test(`bruker egen kanal for originalvarsel (${scenario.kanal}) og revarsel (${scenario.renotifikasjonKanal})`, async ({
        page
    }) => {
        await openVarsel(page, {
            kanal: scenario.kanal,
            tekst: '<strong>Original</strong>',
            renotifikasjonKanal: scenario.renotifikasjonKanal,
            renotifikasjonTekst: '<strong>Påminnelse</strong>'
        });

        const original = page.getByRole('region', { name: varselInnholdNavn });
        const revarsel = page.getByRole('region', { name: revarselInnholdNavn });
        await expect(original.locator('strong')).toHaveCount(scenario.originalHtml ? 1 : 0);
        await expect(revarsel.locator('strong')).toHaveCount(scenario.revarselHtml ? 1 : 0);
        await expect(original).toContainText(scenario.originalHtml ? 'Original' : '<strong>Original</strong>');
        await expect(revarsel).toContainText(scenario.revarselHtml ? 'Påminnelse' : '<strong>Påminnelse</strong>');
    });
}
