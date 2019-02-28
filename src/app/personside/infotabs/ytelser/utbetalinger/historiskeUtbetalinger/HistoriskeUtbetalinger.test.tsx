import * as React from 'react';
import * as renderer from 'react-test-renderer';
import HistoriskeUtbetalingerListe from './HistoriskeUtbetalingerListe';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../../mock/statiskMockUtbetaling';
import { Utbetaling } from '../../../../../../models/utbetalinger';
import { YtelserKeys } from '../../ytelserKeys';
import { KnappStatus } from './HistoriskeUtbetalingerContainer';

test('Historiskutbetaling matcher snapshot', () => {
    const utbetaling: Utbetaling = {
        ...statiskMockUtbetaling,
        ytelser: [
            {
                ...statiskMockYtelse,
                type: YtelserKeys.Foreldrepenger
            }
        ]
    };

    const result = renderer.create(
        <HistoriskeUtbetalingerListe
            utbetalinger={[utbetaling]}
            knappStatus={KnappStatus.Vis}
            hentToÅrGamleUtbetalinger={() => null}
        />
    );

    expect(result.toJSON()).toMatchSnapshot();
});
