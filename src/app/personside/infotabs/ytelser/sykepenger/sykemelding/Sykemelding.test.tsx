import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { statiskSykepengerMock } from '../../../../../../mock/ytelse/statiskSykepengerMock';
import Sykemelding from './Sykemelding';

test('Sykemelding matcher snapshot', () => {
    const resultat = renderer.create(<Sykemelding sykmeldinger={statiskSykepengerMock.sykmeldinger} />);

    expect(resultat.toJSON()).toMatchSnapshot();
});
