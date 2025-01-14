import { render } from '@testing-library/react';
import { statiskSykepengerMock } from '../../../../../../mock/ytelse/statiskSykepengerMock';
import Sykemelding from './Sykemelding';

test('Sykemelding matcher snapshot', () => {
    const { asFragment } = render(<Sykemelding sykmelding={statiskSykepengerMock.sykmeldinger[0]} />);

    expect(asFragment()).toMatchSnapshot();
});
