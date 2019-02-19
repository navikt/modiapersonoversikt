import * as React from 'react';
import HistoriskeUtbetalinger from './HistoriskeUtbetalinger';
import { statiskHistoriskUtbetaling } from '../../../../../mock/ytelse/statiskForeldrepengeMock';
import { YtelserKeys } from '../ytelserKeys';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../mock/statiskMockUtbetaling';
import { Utbetaling } from '../../../../../models/utbetalinger';
import { STATUS } from '../../../../../redux/restReducers/utils';
import { mount } from 'enzyme';

const type = YtelserKeys.Foreldrepenger;

test('Viser to historiske utbetalinger dersom den forsynes med en historisk utbetaling og en utbetaling med matchende type', () => {
    const utbetaling: Utbetaling = {
        ...statiskMockUtbetaling,
        ytelser: [
            {
                ...statiskMockYtelse,
                type: type
            }
        ]
    };

    const result = mount(
        <HistoriskeUtbetalinger
            historiskeUtbetalinger={[statiskHistoriskUtbetaling]}
            hentHistoriskeUtbetalinger={() => undefined}
            ytelseType={type}
            toÅrGamleUtbetalingerFraUtbetalingerRestkonto={[utbetaling]}
            reducerStatus={STATUS.SUCCESS}
        />
    );

    expect(
        result
            .find('ol')
            .first()
            .find('li')
    ).toHaveLength(2);
});

test('Viser knapp for å hente fler utbetalinger hvis utbetalingereducer ikke har startet', () => {
    const result = mount(
        <HistoriskeUtbetalinger
            historiskeUtbetalinger={[statiskHistoriskUtbetaling]}
            hentHistoriskeUtbetalinger={() => undefined}
            ytelseType={type}
            toÅrGamleUtbetalingerFraUtbetalingerRestkonto={null}
            reducerStatus={STATUS.NOT_STARTED}
        />
    );

    expect(
        result
            .find('button')
            .last()
            .html()
    ).toContain('Hent alle');
});
