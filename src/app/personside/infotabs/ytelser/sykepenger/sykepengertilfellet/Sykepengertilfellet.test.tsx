import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Sykepengertilfellet from './Sykepengertilfellet';
import { statiskSykepengerMock } from '../../../../../../mock/ytelse/statiskSykepengerMock';

test('Sykepengertilfellet matcher snapshot', () => {
    const resultat = renderer.create(<Sykepengertilfellet sykepenger={statiskSykepengerMock} />);

    expect(resultat.toJSON()).toMatchSnapshot();
});
