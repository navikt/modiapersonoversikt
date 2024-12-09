import { render, screen } from '@testing-library/react';
import DescriptionList, { type DescriptionListEntries, fjernEntriesUtenVerdi } from './DescriptionList';

test('fjerner tomme properties fra objekt med DescriptionListEntries', () => {
    const test: DescriptionListEntries = {
        streng: 'daniel',
        nummer: 10,
        reactKomponent: <div>Hei</div>,
        tomStreng: '',
        null: null,
        undefined: undefined
    };
    const resultat = fjernEntriesUtenVerdi(test);

    expect(resultat).toEqual({ streng: 'daniel', nummer: 10, reactKomponent: <div>Hei</div> });
});

test('0 blir vist som 0, og ikke som strek', () => {
    const entries: DescriptionListEntries = {
        talletNull: 0
    };

    render(<DescriptionList entries={entries} />);

    expect(screen.getByRole('definition')).toHaveTextContent('0');
});
