import { render } from '@testing-library/react';
import { aremark } from '../../../../../mock/persondata/aremark';
import TestProvider from '../../../../../test/Testprovider';
import SivilstandWrapper from './Sivilstand';

test('viser sivilstand', () => {
    const sivilstand = render(
        <TestProvider>
            <SivilstandWrapper harFeilendeSystem={false} sivilstandListe={aremark.sivilstand} />
        </TestProvider>
    );

    expect(sivilstand.asFragment()).toMatchSnapshot();
});
