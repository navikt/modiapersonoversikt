import * as React from 'react';
import { Utbetaling, UtbetalingerResponse } from '../../../../models/utbetalinger';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { datoSynkende } from '../../../../utils/dateUtils';
import { formaterDato } from '../../../../utils/stringFormatting';
import { Bold } from '../../../../components/common-styled-components';

const ListStyle = styled.ol`
    > * {
        margin-top: ${theme.margin.px1};
    }
`;

const UtbetalingStyle = styled.div`
    background-color: white;
    padding: ${theme.margin.px10};
`;

interface Props {
    utbetalinger: UtbetalingerResponse;
}

function UtbetalingerOversikt() {
    return (
        <RestResourceConsumer<UtbetalingerResponse> getResource={restResources => restResources.utbetalinger}>
            {data => <UtbetalingerPanel utbetalinger={data} />}
        </RestResourceConsumer>
    );
}

function UtbetalingerPanel(props: Props) {
    if (props.utbetalinger.utbetalinger.length === 0) {
        return <Normaltekst>Ingen utbetalinger</Normaltekst>;
    }

    const sortertPåDato = props.utbetalinger.utbetalinger
        .sort(datoSynkende(utbetaling => utbetaling.posteringsdato))
        .slice(0, Math.min(3, props.utbetalinger.utbetalinger.length));

    return (
        <ListStyle>
            {sortertPåDato.map((utbetaling, index) => (
                <EnkelUtbetaling key={index} utbetaling={utbetaling} />
            ))}
        </ListStyle>
    );
}

function EnkelUtbetaling({ utbetaling }: { utbetaling: Utbetaling }) {
    return (
        <UtbetalingStyle>
            <Normaltekst>{formaterDato(utbetaling.posteringsdato)}</Normaltekst>
            <YtelseNavn utbetaling={utbetaling} />
            <Normaltekst>Utbetaling til: {utbetaling.utbetaltTil}</Normaltekst>
        </UtbetalingStyle>
    );
}

function YtelseNavn({ utbetaling }: { utbetaling: Utbetaling }) {
    const unikeYtelser = new Set(
        (utbetaling.ytelser || [])
            .map(ytelse => ytelse.type)
            .filter(ytelseType => ytelseType !== 'Gebyr' && ytelseType !== 'Skatt')
    );

    let ytelseNavn = 'Ingen tilknyttede ytelse';

    if (unikeYtelser.size > 1) {
        ytelseNavn = 'Diverse ytelser';
    } else if (unikeYtelser.size === 1) {
        ytelseNavn = unikeYtelser.values().next().value || '';
    }

    return (
        <Normaltekst>
            <Bold>{ytelseNavn}</Bold>
        </Normaltekst>
    );
}

export default UtbetalingerOversikt;
