import * as React from 'react';
import { Utbetaling, UtbetalingerResponse } from '../../../../models/utbetalinger';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { datoStigende, datoSynkende } from '../../../../utils/dateUtils';
import { formaterDato } from '../../../../utils/stringFormatting';
import { Bold } from '../../../../components/common-styled-components';
import { getGjeldendeDatoForUtbetaling, utbetalingDatoComparator } from '../utbetalinger/utils/utbetalingerUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { useInfotabsDyplenker } from '../dyplenker';
import { utbetalingerTest } from '../dyplenkeTest/utils';
import moment from 'moment';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    utbetalinger: UtbetalingerResponse;
}

function UtbetalingerOversikt() {
    return (
        <RestResourceConsumer<UtbetalingerResponse>
            getResource={restResources => restResources.utbetalinger}
            returnOnPending={<CenteredLazySpinner padding={theme.margin.layout} />}
        >
            {data => <UtbetalingerPanel utbetalinger={data} />}
        </RestResourceConsumer>
    );
}

function datoEldreEnn30Dager(utbetaling: Utbetaling) {
    return moment(getGjeldendeDatoForUtbetaling(utbetaling)) < moment().subtract(30, 'days');
}

function UtbetalingerPanel(props: Props) {
    const sortertPåDato = props.utbetalinger.utbetalinger.sort(utbetalingDatoComparator).slice(0, 3);

    if (sortertPåDato.length === 0 || datoEldreEnn30Dager(sortertPåDato[0])) {
        return (
            <AlertStripeInfo>
                Det finnes ikke noen utbetalinger for de siste 30 dagene. Trykk på utbetalinger for å utvide
                søkeperioden.
            </AlertStripeInfo>
        );
    }

    return (
        <ListStyle aria-label="Oversikt brukers utbetalinger">
            {sortertPåDato.map((utbetaling, index) => (
                <EnkelUtbetaling key={index} utbetaling={utbetaling} />
            ))}
        </ListStyle>
    );
}

function EnkelUtbetaling({ utbetaling }: { utbetaling: Utbetaling }) {
    const dyplenkerInfotabs = useInfotabsDyplenker();
    return (
        <li className={utbetalingerTest.oversikt}>
            <VisMerKnapp
                valgt={false}
                ariaDescription={`Vis utbetaling`}
                linkTo={dyplenkerInfotabs.utbetaling.link(utbetaling)}
            >
                <Normaltekst>
                    {formaterDato(getGjeldendeDatoForUtbetaling(utbetaling))} / {utbetaling.status}
                </Normaltekst>
                <YtelseNavn utbetaling={utbetaling} />
                <YtelsePeriode utbetaling={utbetaling} />
                <Normaltekst>Utbetaling til: {utbetaling.utbetaltTil}</Normaltekst>
            </VisMerKnapp>
        </li>
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

function YtelsePeriode({ utbetaling }: { utbetaling: Utbetaling }) {
    const ytelsesperioder = (utbetaling.ytelser || [])
        .filter(ytelse => ytelse.type !== 'Gebyr' && ytelse.type !== 'Skatt')
        .map(ytelse => ytelse.periode);

    if (ytelsesperioder.length === 0) {
        return <Normaltekst>Ingen periode</Normaltekst>;
    }

    const tidligsteStart = ytelsesperioder.sort(datoStigende(periode => periode.start))[0].start;
    const senesteSlutt = ytelsesperioder.sort(datoSynkende(periode => periode.slutt))[0].slutt;

    return (
        <Normaltekst>
            {formaterDato(tidligsteStart)} - {formaterDato(senesteSlutt)}
        </Normaltekst>
    );
}

export default UtbetalingerOversikt;
