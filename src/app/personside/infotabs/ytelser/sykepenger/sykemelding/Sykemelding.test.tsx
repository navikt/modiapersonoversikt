import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { statiskSykepengerMock } from '../../../../../../mock/ytelse/statiskSykepengerMock';
import Sykemelding from './Sykemelding';

test('Sykemelding matcher snapshot', () => {
    const resultat = renderer.create(<Sykemelding sykmelding={statiskSykepengerMock.sykmeldinger[0]} />);

    expect(resultat.toJSON()).toMatchSnapshot();
});
