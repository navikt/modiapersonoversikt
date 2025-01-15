import { render } from '@testing-library/react';
import { aremark } from '../../../../../../mock/persondata/aremark';
import TestProvider from '../../../../../../test/Testprovider';
import KontaktinformasjonDodsbo from './Dodsbo';

test('viser dodsbo', () => {
    const dodsbo = render(
        <TestProvider>
            <KontaktinformasjonDodsbo harFeilendeSystem={false} dodsbo={aremark.dodsbo} />
        </TestProvider>
    );

    expect(dodsbo.asFragment()).toMatchSnapshot();
});
