import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../../mock/statiskMockUtbetaling';
import { Utbetaling, Ytelse } from '../../../../../../models/utbetalinger';
import { YtelserKeys } from '../../ytelserKeys';
import UtførtUtbetaling from './UtførtUtbetaling';

test('Kommende utbetaling matcher snapshot', () => {
    const ytelse: Ytelse = {
        ...statiskMockYtelse,
        type: YtelserKeys.Foreldrepenger
    };

    const utbetaling: Utbetaling = {
        ...statiskMockUtbetaling,
        ytelser: [ytelse]
    };

    const result = renderer.create(<UtførtUtbetaling utbetaling={utbetaling} ytelse={ytelse} />);

    expect(result.toJSON()).toMatchSnapshot();
});
