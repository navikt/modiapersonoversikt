import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

type AxeViolation = Awaited<ReturnType<AxeBuilder['analyze']>>['violations'][number];
type A11yViolation = AxeViolation & { tab: string };

const faner = ['oversikt', 'oppfolging', 'meldinger', 'utbetaling', 'dokumenter', 'ytelser', 'varsler'];

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

faner.forEach((fane) => {
    test(`Universell utforming: Analyse av new/person/${fane}`, async ({ page }) => {
        await page.goto(`/new/person/${fane}`);
        await page.waitForLoadState('networkidle');
        await page.getByTestId('person-route').waitFor();

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
        console.log(`\n--- /new/person/${tab} ---`);
        for (const v of violations) {
            console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
            console.log(`  nodes: ${v.nodes.map((n) => n.html).join(', ')}`);
            console.log(`  help: ${v.helpUrl}`);
        }
    }
});

test(`Universell urforming: Forventer ingen regelbrudd`, async () => {
    expect(allViolations, `A11y: ${allViolations.length} regelbrudd funnet — se logg for detaljer`).toHaveLength(0);
});
