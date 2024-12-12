import * as renderer from 'react-test-renderer';
import { statiskSykepengerMock } from '../../../../../../mock/ytelse/statiskSykepengerMock';
import Sykepengertilfellet from './Sykepengertilfellet';

test('Sykepengertilfellet matcher snapshot', () => {
    const resultat = renderer.create(<Sykepengertilfellet sykepenger={statiskSykepengerMock} />);

    expect(resultat.toJSON()).toMatchSnapshot();
});
