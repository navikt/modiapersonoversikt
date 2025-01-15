import { render } from '@testing-library/react';
import { aremark } from '../../../../../mock/persondata/aremark';
import TestProvider from '../../../../../test/Testprovider';
import DeltBosted from './DeltBosted';

test('viser deltbosted', () => {
    const visittkortbody = render(
        <TestProvider>
            <DeltBosted deltBosted={aremark.deltBosted} />
        </TestProvider>
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
