import * as React from 'react';
import * as renderer from 'react-test-renderer';
import UtbetalingerPVent from './UtbetalingerPåVent';
import { statiskSykepengerMock } from '../../../../../../mock/ytelse/statiskSykepengerMock';

test('UtbetalingerPVent matcher snapshot', () => {
    const utbetalingPåVent = statiskSykepengerMock.utbetalingerPåVent[0];
    const resultat = renderer.create(<UtbetalingerPVent utbetalingerPåVent={[utbetalingPåVent]} />);

    expect(resultat.toJSON()).toMatchSnapshot();
});
