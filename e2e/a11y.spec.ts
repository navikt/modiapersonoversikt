import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

type AxeViolation = Awaited<ReturnType<AxeBuilder['analyze']>>['violations'][number];
type A11yViolation = AxeViolation & { tab: string };

const faner = ['hjem', 'oversikt', 'oppfolging', 'meldinger', 'utbetaling', 'dokumenter', 'ytelser', 'varsler'];

test.describe.configure({ mode: 'serial', retries: 0 });

let allViolations: A11yViolation[] = [];

test.beforeAll(() => {
    allViolations = [];
});

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

test('hjemsiden har én hovedoverskrift og et sammenhengende overskriftshierarki', async ({ page }) => {
    await page.goto('/new/person/hjem');
    await page.getByTestId('person-route').waitFor();

    const main = page.getByRole('main');
    await page
        .getByRole('dialog', { name: 'Sikkerhetstiltak', exact: true })
        .getByRole('button', { name: 'Ok' })
        .click();
    await expect(main.getByRole('heading', { name: 'AREMARK TESTFAMILIEN', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Modia personoversikt/i);

    await expect(main.getByRole('heading', { name: 'Familie', exact: true, level: 3 })).toBeVisible();
    await main.getByRole('button', { name: 'Familiemedlemmer', exact: true }).click();

    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(main.getByRole('heading', { name: 'AREMARK TESTFAMILIEN', exact: true, level: 2 })).toBeVisible();
    await expect(main.getByRole('heading', { name: 'Partner', exact: true, level: 4 })).toBeVisible();
    await expect(main.getByRole('heading', { name: 'Barn', exact: true, level: 4 })).toBeVisible();

    const overskriftsnivaer = await main
        .getByRole('heading')
        .evaluateAll((overskrifter) => overskrifter.map((overskrift) => Number(overskrift.tagName.slice(1))));

    let forrigeNiva = 1;
    for (const niva of overskriftsnivaer) {
        expect(niva).toBeLessThanOrEqual(forrigeNiva + 1);
        forrigeNiva = niva;
    }
});

faner.forEach((fane) => {
    test(`Universell utforming: Analyse av new/person/${fane}`, async ({ page }) => {
        await page.goto(`/new/person/${fane}`);
        await page.getByTestId('person-route').waitFor();
        await page.waitForURL(`**/new/person/${fane}**`);
        await page.waitForLoadState('networkidle');

        const { violations } = await new AxeBuilder({ page }).analyze();

        for (const violation of violations) {
            allViolations.push({ ...violation, tab: fane });
        }
    });
});

test.afterAll(() => {
    if (allViolations.length === 0) return;

    const byTab = Map.groupBy(allViolations, (v) => v.tab);
    for (const [tab, violations] of byTab) {
        console.log(`\n--- /new/person/${tab}: Inneholder ${violations.length} regelbrudd ---`);
        for (const v of violations) {
            console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
            console.log(`  nodes: ${v.nodes.map((n) => n.html).join(', ')}`);
            console.log(`  help: ${v.helpUrl}`);
        }
    }
});

test(`Universell utforming: Forventer ingen regelbrudd`, async () => {
    expect(allViolations, `A11y: ${allViolations.length} regelbrudd funnet — se logg for detaljer`).toHaveLength(0);
});
