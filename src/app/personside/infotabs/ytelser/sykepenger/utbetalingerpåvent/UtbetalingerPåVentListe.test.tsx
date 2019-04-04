import * as React from 'react';
import * as renderer from 'react-test-renderer';
import UtbetalingerPåVentListe from './UtbetalingerPåVentListe';
import { statiskSykepengerMock } from '../../../../../../mock/ytelse/statiskSykepengerMock';

test('UtbetalingerPåVentListe matcher snapshot', () => {
    const utbetalingPåVent = statiskSykepengerMock.utbetalingerPåVent[0];
    const resultat = renderer.create(<UtbetalingerPåVentListe utbetalingerPåVent={[utbetalingPåVent]} />);

    expect(resultat.toJSON()).toMatchSnapshot();
});
