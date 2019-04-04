import React from 'react';
import { DescriptionListEntries, fjernEntriesUtenVerdi } from './DescriptionList';

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
