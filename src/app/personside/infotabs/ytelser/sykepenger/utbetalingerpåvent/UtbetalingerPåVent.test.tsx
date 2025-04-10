import { render } from '@testing-library/react';
import { statiskSykepengerMock } from 'src/mock/ytelse/statiskSykepengerMock';
import UtbetalingerPVent from './UtbetalingerPåVent';

test('UtbetalingerPVent matcher snapshot', () => {
    const utbetalingPssVent = statiskSykepengerMock.utbetalingerPaaVent[0];
    const resultat = render(<UtbetalingerPVent utbetalingerPaaVent={[utbetalingPssVent]} />);

    expect(resultat.asFragment()).toMatchSnapshot();
});
