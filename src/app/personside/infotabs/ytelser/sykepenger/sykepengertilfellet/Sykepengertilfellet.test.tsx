import { render } from '@testing-library/react';
import { statiskSykepengerMock } from '../../../../../../mock/ytelse/statiskSykepengerMock';
import Sykepengertilfellet from './Sykepengertilfellet';

test('Sykepengertilfellet matcher snapshot', () => {
    const resultat = render(<Sykepengertilfellet sykepenger={statiskSykepengerMock} />);

    expect(resultat.asFragment()).toMatchSnapshot();
});
