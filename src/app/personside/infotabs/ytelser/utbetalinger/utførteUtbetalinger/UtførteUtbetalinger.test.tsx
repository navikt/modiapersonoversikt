import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../../mock/statiskMockUtbetaling';
import { Utbetaling } from '../../../../../../models/utbetalinger';
import { YtelserKeys } from '../../ytelserKeys';
import UtførteUtbetalinger from './UtførteUtbetalinger';
import { KnappStatus } from './UtførteUtbetalingerContainer';

test('Kommende utbetalinger matcher snapshot', () => {
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
        <UtførteUtbetalinger
            utbetalinger={[utbetaling]}
            knappStatus={KnappStatus.Vis}
            hentToÅrGamleUtbetalinger={() => null}
        />
    );

    expect(result.toJSON()).toMatchSnapshot();
});
