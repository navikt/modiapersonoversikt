import * as React from 'react';
import { mount } from 'enzyme';

import Vergemål from './Vergemal';

test('Vergemål uten verge', () => {
    const vergemål = {
        verger: []
    };

    const VergemålWrapper = mount(<Vergemål vergemal={vergemål}/>);

    expect(VergemålWrapper.getDOMNode()).toBeNull();
});

test('Viser vergemål', () => {
    const vergemål = {
        verger: [{
            ident: '10108000398',
            navn: {
                fornavn: '',
                etternavn: '',
                mellomnavn: '',
                sammensatt: 'Vergen Aremark'
            },
            virkningsperiode: {

            }
        }]
    };

    const VergemålWrapper = mount(<Vergemål vergemal={vergemål}/>);

    expect(VergemålWrapper.text()).toContain('Vergen Aremark');
});