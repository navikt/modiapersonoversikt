import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { aremark } from '../../../../../mock/persondata/aremark';
import TestProvider from '../../../../../test/Testprovider';
import SivilstandWrapper from './Sivilstand';

test('viser sivilstand', () => {
    const sivilstand = renderer.create(
        <TestProvider>
            <SivilstandWrapper sivilstandListe={aremark.sivilstand} />
        </TestProvider>
    );

    expect(sivilstand.toJSON()).toMatchSnapshot();
});
