import * as React from 'react';
import { mount } from 'enzyme';
import Vergemal from './Vergemal';
import Vergesakstype from './Vergesakstype';

const mockVerge = (ident: string) => ({
    ident,
    navn: {
        fornavn: 'Testfamilie',
        mellomnavn: '',
        etternavn: 'Vergersen'
    },
    vergesakstype: 'voksen',
    omfang: null,
    embete: null,
    gyldighetstidspunkt: null,
    opphoerstidspunkt: null
});

test('Vergemål uten verge', () => {
    const vergemalWrapper = mount(<Vergemal vergemal={[]} />);

    expect(vergemalWrapper.getDOMNode()).toBeNull();
});

test('Viser vergemål', () => {
    const vergemalWrapper = mount(<Vergemal vergemal={[mockVerge('0')]} />);

    expect(vergemalWrapper.text()).toContain('Testfamilie Vergersen');
});

describe('Vergemål med flere verger', () => {
    test('Slår sammen duplikate vergesakstyper', () => {
        const vergemalWrapper = mount(<Vergemal vergemal={[mockVerge('0'), mockVerge('1')]} />);

        expect(vergemalWrapper.find(Vergesakstype)).toHaveText('Voksen');
    });

    test('Viser flere vergesakstyper', () => {
        const verge2 = mockVerge('1');
        verge2.vergesakstype = 'ensligMindreaarigAsylsoeker';

        const vergemalWrapper = mount(<Vergemal vergemal={[mockVerge('0'), verge2]} />);

        expect(vergemalWrapper.find(Vergesakstype)).toHaveText('Voksen, Enslig mindreårig asylsøker');
    });
});
