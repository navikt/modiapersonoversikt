import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../../mock/statiskMockUtbetaling';
import { Utbetaling } from '../../../../../../models/utbetalinger';
import { YtelserKeys } from '../../ytelserKeys';
import UtførteUtbetalingerListe from './UtførteUtbetalingerListe';
import { KnappStatus } from './UtførteUtbetalingerContainer';

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
        <UtførteUtbetalingerListe
            utbetalinger={[utbetaling]}
            knappStatus={KnappStatus.Vis}
            hentToÅrGamleUtbetalinger={() => null}
        />
    );

    expect(result.toJSON()).toMatchSnapshot();
});
