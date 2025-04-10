import { render } from '@testing-library/react';
import { statiskForeldrepengeMock } from 'src/mock/ytelse/statiskForeldrepengeMock';
import TestProvider from '../../../../../test/Testprovider';
import Foreldrepenger from './ForeldrePenger';

test('Foreldrepengeperiode matcher snapshot', () => {
    const testRettighet = statiskForeldrepengeMock;
    const result = render(
        <TestProvider>
            <Foreldrepenger foreldrepenger={testRettighet} />
        </TestProvider>
    );

    expect(result.asFragment()).toMatchSnapshot();
});
