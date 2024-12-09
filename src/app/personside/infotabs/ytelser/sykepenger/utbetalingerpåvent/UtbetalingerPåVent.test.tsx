import * as renderer from 'react-test-renderer';
import { statiskSykepengerMock } from '../../../../../../mock/ytelse/statiskSykepengerMock';
import UtbetalingerPVent from './UtbetalingerPåVent';

test('UtbetalingerPVent matcher snapshot', () => {
    const utbetalingPåVent = statiskSykepengerMock.utbetalingerPåVent[0];
    const resultat = renderer.create(<UtbetalingerPVent utbetalingerPåVent={[utbetalingPåVent]} />);

    expect(resultat.toJSON()).toMatchSnapshot();
});
