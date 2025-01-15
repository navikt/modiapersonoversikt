import { render } from '@testing-library/react';
import { statiskSykepengerMock } from '../../../../../../mock/ytelse/statiskSykepengerMock';
import UtbetalingerPVent from './UtbetalingerPåVent';

test('UtbetalingerPVent matcher snapshot', () => {
    const utbetalingPåVent = statiskSykepengerMock.utbetalingerPåVent[0];
    const resultat = render(<UtbetalingerPVent utbetalingerPåVent={[utbetalingPåVent]} />);

    expect(resultat.asFragment()).toMatchSnapshot();
});
