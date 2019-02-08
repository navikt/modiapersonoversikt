import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { getForeldrepengerettighetMock } from '../../../../../mock/ytelse/foreldrepenger-mock';
import Foreldrepenger from './ForeldrePenger';
import { Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';

test('Foreldrepengeperiode matcher snapshot', () => {
    const testRettighet = getForeldrepengerettighetMock('10108000398', 1234);
    const redusertRettighet: Foreldrepengerettighet = {
        ...testRettighet,
        arbeidsforhold: [testRettighet.arbeidsforhold[0], testRettighet.arbeidsforhold[0]],
        periode: [
            {
                ...testRettighet.periode[0],
                historiskeUtbetalinger: [testRettighet.periode[0].historiskeUtbetalinger[0]],
                kommendeUtbetalinger: [testRettighet.periode[0].kommendeUtbetalinger[0]],
            },
        ],
    };
    const result = renderer.create(<Foreldrepenger foreldrepenger={redusertRettighet} />);

    expect(result).toMatchSnapshot();
});
