import React from 'react';
import DescriptionList, { DescriptionListEntries, fjernEntriesUtenVerdi } from './DescriptionList';
import { mount } from 'enzyme';

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

    const resultat = mount(<DescriptionList entries={entries} />);

    expect(resultat.find('dd').contains('0')).toBe(true);
});
