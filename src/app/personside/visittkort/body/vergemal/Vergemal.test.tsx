import * as React from 'react';
import { mount } from 'enzyme';
import Vergemål from './Vergemal';
import { Vergesakstype } from './Vergesakstype';

const mockVerge = (ident: string) => ({
    ident,
    navn: {
        fornavn: '',
        etternavn: '',
        mellomnavn: '',
        sammensatt: 'Vergen Aremark'
    },
    vergesakstype: 'voksen'
});

test('Vergemål uten verge', () => {
    const VergemålWrapper = mount(<Vergemål vergemal={[]} />);

    expect(VergemålWrapper.getDOMNode()).toBeNull();
});

test('Viser vergemål', () => {
    const VergemålWrapper = mount(<Vergemål vergemal={[mockVerge('0')]} />);

    expect(VergemålWrapper.text()).toContain('Vergen Aremark');
});

describe('Vergemål med flere verger', () => {
    test('Slår sammen duplikate vergesakstyper', () => {
        const VergemålWrapper = mount(<Vergemål vergemal={[mockVerge('0'), mockVerge('1')]} />);
        expect(VergemålWrapper.find(Vergesakstype)).toHaveText('Voksen');
    });

    test('Viser flere vergesakstyper', () => {
        const verge2 = mockVerge('1');
        verge2.vergesakstype = 'ensligMindreaarigAsylsoeker';

        const VergemålWrapper = mount(<Vergemål vergemal={[mockVerge('0'), verge2]} />);

        expect(VergemålWrapper.find(Vergesakstype)).toHaveText('Voksen, Enslig mindreårig asylsøker');
    });
});
