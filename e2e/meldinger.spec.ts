import { expect, test } from '@playwright/test';

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

test('Select melding', async ({ page }) => {
    await page.goto('/new/person/meldinger');

    const meldingerList = await page.getByRole('region', { name: 'Tråder', exact: true });
    await expect(meldingerList).toBeVisible();
    const meldingerCards = meldingerList.getByTestId('traaditem');
    expect((await meldingerCards.all()).length).toBeGreaterThan(4);

    await meldingerCards.first().click();

    const meldingerDetails = page.getByRole('region', { name: 'Dialogdetaljer' });

    await expect(meldingerDetails).toBeVisible();
});

test('Mobile meldinger keep the list and selected dialog independently scrollable', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 560 });
    await page.goto('/new/person/meldinger');

    const listPane = page.getByTestId('mobile-meldinger-list-pane');
    const detailPane = page.getByTestId('mobile-meldinger-detail-pane');
    const firstThread = page.getByTestId('traaditem').first();
    await expect(listPane).toBeVisible();
    await expect(detailPane).toBeVisible();
    await expect(firstThread).toBeVisible();

    await firstThread.focus();
    await firstThread.press('Enter');
    const dialogDetails = page.getByRole('region', { name: 'Dialogdetaljer' });
    await expect(dialogDetails).toBeVisible();

    const initialGeometry = await page.evaluate(() => {
        const rect = (testId: string) => {
            const element = document.querySelector(`[data-testid="${testId}"]`);
            if (!element) throw new Error(`Missing ${testId}`);
            const { x, y, width, height } = element.getBoundingClientRect();
            return { x, y, width, height };
        };
        return {
            list: rect('mobile-meldinger-list-pane'),
            detail: rect('mobile-meldinger-detail-pane'),
            viewportHeight: window.innerHeight
        };
    });
    expect(initialGeometry.list.y).toBeGreaterThanOrEqual(0);
    expect(initialGeometry.list.y + initialGeometry.list.height).toBeLessThanOrEqual(initialGeometry.viewportHeight);
    expect(initialGeometry.detail.y).toBeGreaterThanOrEqual(0);
    expect(initialGeometry.detail.y + initialGeometry.detail.height).toBeLessThanOrEqual(
        initialGeometry.viewportHeight
    );
    expect(initialGeometry.detail.height).toBeGreaterThan(initialGeometry.list.height);

    const dialogBox = await dialogDetails.boundingBox();
    if (!dialogBox) throw new Error('Dialogdetaljer has no bounding box');
    expect(dialogBox.y + dialogBox.height).toBeLessThanOrEqual(initialGeometry.viewportHeight);

    const listScroll = await listPane.evaluate((pane) => {
        const scrollable = [pane, ...pane.querySelectorAll<HTMLElement>('*')].find(
            (element) =>
                element.scrollHeight > element.clientHeight + 1 &&
                ['auto', 'scroll'].includes(getComputedStyle(element).overflowY)
        );
        if (!scrollable) return null;
        scrollable.scrollTop = Math.min(120, scrollable.scrollHeight - scrollable.clientHeight);
        return scrollable.scrollTop;
    });
    if (listScroll === null) throw new Error('The dialog list has no scrollable content');
    expect(listScroll).toBeGreaterThan(0);

    const detailAfterListScroll = await detailPane.boundingBox();
    if (!detailAfterListScroll) throw new Error('The dialog pane has no bounding box');
    expect(detailAfterListScroll.y).toBe(initialGeometry.detail.y);
    await expect(dialogDetails).toBeVisible();

    const detailScroll = await dialogDetails.evaluate((region) => {
        let scrollable = region.parentElement;
        while (scrollable) {
            const overflowY = getComputedStyle(scrollable).overflowY;
            if (['auto', 'scroll'].includes(overflowY) && scrollable.scrollHeight > scrollable.clientHeight + 1) {
                const before = scrollable.scrollTop;
                scrollable.scrollTop = Math.min(120, scrollable.scrollHeight - scrollable.clientHeight);
                return { before, after: scrollable.scrollTop };
            }
            scrollable = scrollable.parentElement;
        }
        return null;
    });
    if (!detailScroll) throw new Error('The selected dialog has no independently scrollable content');
    expect(detailScroll.after).toBeGreaterThan(detailScroll.before);

    const detailPaneAfterScroll = await detailPane.boundingBox();
    if (!detailPaneAfterScroll) throw new Error('The dialog pane has no bounding box');
    expect(detailPaneAfterScroll.y).toBe(initialGeometry.detail.y);
    expect(detailPaneAfterScroll.y + detailPaneAfterScroll.height).toBeLessThanOrEqual(initialGeometry.viewportHeight);
    await expect(dialogDetails).toBeVisible();
});

test('Meldinger keep the side-by-side layout on wide viewports', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/new/person/meldinger?traadId=sg838exr');

    const meldingerList = page.getByRole('region', { name: 'Tråder', exact: true });
    const dialogDetails = page.getByRole('region', { name: 'Dialogdetaljer' });
    await expect(meldingerList).toBeVisible();
    await expect(dialogDetails).toBeVisible();
    await expect(page.getByTestId('mobile-meldinger-list-pane')).toHaveCount(0);

    const listBox = await meldingerList.boundingBox();
    const detailBox = await dialogDetails.boundingBox();
    if (!listBox || !detailBox) throw new Error('Meldinger panes have no bounding boxes');
    expect(detailBox.x).toBeGreaterThanOrEqual(listBox.x + listBox.width);
});

test('Send melding i tråd', async ({ page }) => {
    await page.goto('/new/person/meldinger?traadId=e2e-svarbar-meldingskjede');
    await expect(page.getByRole('region', { name: 'Dialogdetaljer' })).toBeVisible();

    const svarKnapp = page.getByRole('button', { name: 'Svar' });
    await expect(svarKnapp).toBeVisible();
    await svarKnapp.click();

    await page.getByRole('button', { name: 'Overskrid' }).click();
    await page.getByRole('textbox').fill('playwright test melding');

    await page.addStyleTag({ content: '.TanStackRouterDevtools { display: none !important; }' });
    await page.getByTestId('svar-knapp-fortsett-dialog').click();

    const meldingerList = page.getByRole('region', { name: 'Dialogdetaljer' }).getByRole('list', { name: 'Meldinger' });
    const newMelding = meldingerList.getByText('playwright test melding');

    await expect(newMelding).toBeVisible();
});

test('Send ny melding', async ({ page }) => {
    await page.goto('/new/person/meldinger');

    await page.getByRole('button', { name: 'Skriv ny melding' }).click();
    await page.getByRole('button', { name: 'Overskrid' }).click();
    await page.getByRole('radio', { name: 'Referat' }).click();
    await page.getByRole('textbox').fill('playwright new melding');
    await page.getByLabel('Temagruppe').selectOption('Pensjon');

    await page.addStyleTag({ content: '.TanStackRouterDevtools { display: none !important; }' });
    await page.getByTestId('svar-knapp').click();

    const newTraad = page.getByTestId('traaditem').first();
    await expect(newTraad).toBeVisible();
    await expect(newTraad).toContainText('Referat');
    await expect(newTraad).toContainText('Tema:Pensjon');

    await newTraad.click();

    const meldingerDetails = page.getByRole('region', { name: 'Dialogdetaljer' });
    await expect(meldingerDetails.getByRole('heading').first()).toHaveText('Referat - Pensjon');

    const meldingerList = page.getByRole('region', { name: 'Dialogdetaljer' }).getByRole('list', { name: 'Meldinger' });
    await expect(meldingerList).toHaveCount(1);
    await expect(meldingerList.first()).toContainText('playwright new melding');
});

test('Journalfore dialog', async ({ page }) => {
    // traadId from statiskTraadMock
    await page.goto('/new/person/meldinger?traadId=sg838exr');
    await page.getByTestId('journalposter-readmore').click();

    const journalposterTable = page.getByTestId('journalposter-table');
    const journalposter = journalposterTable.getByRole('row');
    await expect(journalposterTable).toBeVisible();
    const existingRows = await journalposter.count();

    await page.getByRole('button', { name: 'Åpne menyvalg for tråd' }).click();
    await page.getByRole('menuitem', { name: 'Journalfør' }).click();

    const modal = page.getByRole('dialog', { name: 'Journalfør dialog' });
    const submitButton = modal.getByRole('button', { name: 'Journalfør', exact: true });
    await expect(submitButton).toBeDisabled();

    const temaRow = modal.getByRole('option', { name: 'Dagpenger' });
    await temaRow.click();
    const sakRow = modal.getByRole('listbox', { name: 'Velg sak' }).getByRole('option').first();
    const saksId = (await sakRow.locator('span').first().textContent()) ?? 'Fail';
    await sakRow.click();

    await expect(submitButton).not.toBeDisabled();

    await submitButton.click();
    await expect(modal).not.toBeVisible();
    await expect(journalposter).toHaveCount(existingRows + 1);
    await expect(journalposterTable.getByText(saksId)).toBeVisible();
});
test('Autocomplete textarea', async ({ page }) => {
    await page.goto('/new/person');
    await page.getByRole('button', { name: 'Skriv ny melding' }).click();

    await page.getByRole('button', { name: 'Overskrid' }).click();

    const textarea = page.getByRole('textbox');

    await textarea.clear();

    await textarea.pressSequentially('hei ');

    const replacedText = 'Hei, Aremark';
    await expect(textarea).toHaveText(replacedText);
});

test('Avslutt dialog', async ({ page }) => {
    await page.goto('/new/person/meldinger?traadId=e2e-svarbar-meldingskjede');
    await page.getByRole('button', { name: 'Åpne menyvalg for tråd' }).click();
    const avsluttItem = page.getByRole('menuitem', { name: 'Avslutt' });
    await expect(avsluttItem).toBeVisible();
    await avsluttItem.click();

    const avsluttDialog = page.getByRole('dialog', { name: 'Avslutt dialog' });
    await expect(avsluttDialog).toBeVisible();
    await avsluttDialog.getByRole('button', { name: 'Avslutt' }).click();

    await expect(avsluttDialog).not.toBeVisible();

    await expect(page.getByText('Samtalen er avsluttet')).toBeVisible();
});

test('Lag ny oppgave', async ({ page }) => {
    await page.goto('/new/person/meldinger?traadId=e2e-svarbar-meldingskjede');
    await page.getByRole('button', { name: 'Åpne menyvalg for tråd' }).click();
    await page.getByRole('menuitem', { name: 'Ny oppgave' }).click();

    const opprettDialog = page.getByRole('dialog', { name: 'Opprett oppgave' });
    await expect(opprettDialog).toBeVisible();

    await opprettDialog.getByRole('combobox', { name: 'Tema' }).selectOption('Bidrag');
    await opprettDialog.getByRole('combobox', { name: 'Gjelder' }).selectOption('Anke');
    await opprettDialog.getByRole('combobox', { name: 'Oppgavetype' }).selectOption('Kontakt bruker');

    await opprettDialog.getByRole('checkbox').check();

    await opprettDialog.getByRole('combobox', { name: 'Prioritering' }).selectOption('Høy');
    await opprettDialog.getByRole('textbox').fill('Test beskrivelse av en oppgave');

    const oppgaveResPromise = page.waitForResponse('**/opprett');
    await opprettDialog.getByRole('button', { name: 'Opprett oppgave' }).click();
    const oppgaveRes = await oppgaveResPromise;

    expect(oppgaveRes.ok).toBeTruthy();
    await expect(opprettDialog).not.toBeVisible();
});
