import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';
import { Table, type TableRows, type TitleRow } from './Table';

test('lager tabell basert på input', () => {
    const header: TitleRow = ['kolonne 1', 'kolonne 2'];
    const body: TableRows = [['rad1 kolonne 1', 'rad1 kolonne 2']];

    render(<Table tittelRekke={header} rows={body} />);

    expect(screen.getByRole('table')).toMatchSnapshot();
});

test('setter på riktige click-handlere på riktige kolonner', async () => {
    const header: TitleRow = ['kolonne 1', 'kolonne 2'];
    const body: TableRows = [
        ['rad1 kolonne 1', 'rad1 kolonne 2'],
        ['rad2 kolonne 1', 'rad2 kolonne 2']
    ];
    const callbackFørsteRekke = vi.fn();
    const callbackAndreRekke = vi.fn();
    const onClickHandlere = [callbackFørsteRekke, callbackAndreRekke];
    render(<Table tittelRekke={header} rows={body} rowsOnClickHandlers={onClickHandlere} />);

    const user = userEvent.setup();

    const tbody = screen.getByTestId('table-tbody');
    const firstRow = within(tbody).getAllByRole('row')[0];
    await user.click(firstRow);
    await user.click(firstRow);
    await user.click(within(tbody).getAllByRole('row')[1]);

    expect(callbackFørsteRekke.mock.calls.length).toBe(2);
    expect(callbackAndreRekke.mock.calls.length).toBe(1);
});
