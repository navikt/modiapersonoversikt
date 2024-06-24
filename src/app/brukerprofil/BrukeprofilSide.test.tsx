import * as React from 'react';
import { render } from '@testing-library/react';

import BrukerprofilSide from './BrukerprofilSide';
import TestProvider from '../../test/Testprovider';

test('Smoketeste brukerprofil', () => {
    const { container } = render(
        <TestProvider>
            <BrukerprofilSide />
        </TestProvider>
    );

    expect(container).toMatchSnapshot();
});
