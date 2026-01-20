import dayjs from 'dayjs';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import type { ReactNode } from 'react';
import { trackingEvents } from 'src/utils/analytics';
import styled from 'styled-components';
import { Bold } from '../../../../components/common-styled-components';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import type { Utbetaling, UtbetalingerResponse } from '../../../../models/utbetalinger';
import utbetalinger from '../../../../rest/resources/utbetalingerResource';
import theme from '../../../../styles/personOversiktTheme';
import { datoStigende, datoSynkende, datoVerbose } from '../../../../utils/date-utils';
import { formaterDato } from '../../../../utils/string-utils';
import { useInfotabsDyplenker } from '../dyplenker';
import { utbetalingerTest } from '../dyplenkeTest/utils-dyplenker-test';
import { getGjeldendeDatoForUtbetaling, utbetalingDatoComparator } from '../utbetalinger/utils/utbetalinger-utils';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

function UtbetalingerOversikt(props: Props) {
    return utbetalinger.useOversiktRenderer({
        ifPending: <CenteredLazySpinner padding={theme.margin.layout} />,
        ifData: (data: UtbetalingerResponse) => <UtbetalingerPanel utbetalinger={data} {...props} />
    });
}

function datoEldreEnn30Dager(utbetaling: Utbetaling) {
    return dayjs(getGjeldendeDatoForUtbetaling(utbetaling)).toDate() < dayjs().subtract(30, 'days').toDate();
}

function UtbetalingerPanel(props: { utbetalinger: UtbetalingerResponse } & Props) {
    const filtrertOgSorterteUtbetalinger = props.utbetalinger.utbetalinger
        .sort(utbetalingDatoComparator)
        .slice(0, 2)
        .filter((utbetaling) => !datoEldreEnn30Dager(utbetaling));

    if (filtrertOgSorterteUtbetalinger.length === 0) {
        return <AlertStripeInfo>Det finnes ikke noen utbetalinger for de siste 30 dagene</AlertStripeInfo>;
    }

    return (
        <ListStyle aria-label="Oversikt brukers utbetalinger">
            {filtrertOgSorterteUtbetalinger.map((utbetaling, index) => (
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
                ariaDescription={'Vis utbetaling'}
                linkTo={dyplenkerInfotabs.utbetaling.link(utbetaling)}
                umamiEvent={{
                    name: trackingEvents.detaljvisningKlikket,
                    data: { fane: 'oversikt', tekst: 'vis utbetaling' }
                }}
            >
                <Normaltekst>
                    {datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling)).sammensatt} / {utbetaling.status}
                </Normaltekst>
                <YtelseNavn utbetaling={utbetaling} />
                <YtelsePeriode utbetaling={utbetaling} />
                <Normaltekst>Utbetaling til: {utbetaling.utbetaltTil}</Normaltekst>
                <Normaltekst>Utbetalingsmetode: {utbetaling.metode}</Normaltekst>
            </VisMerKnapp>
        </li>
    );
}

function YtelseNavn({ utbetaling }: { utbetaling: Utbetaling }) {
    const unikeYtelser = new Set(
        (utbetaling.ytelser || [])
            .map((ytelse) => ytelse.type)
            .filter((ytelseType) => ytelseType !== 'Gebyr' && ytelseType !== 'Skatt')
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
        .filter((ytelse) => ytelse.type !== 'Gebyr' && ytelse.type !== 'Skatt')
        .map((ytelse) => ytelse.periode);

    if (ytelsesperioder.length === 0) {
        return <Normaltekst>Ingen periode</Normaltekst>;
    }

    const tidligsteStart = ytelsesperioder.sort(datoStigende((periode) => periode.start))[0].start;
    const senesteSlutt = ytelsesperioder.sort(datoSynkende((periode) => periode.slutt))[0].slutt;

    return (
        <Normaltekst>
            {formaterDato(tidligsteStart)} - {formaterDato(senesteSlutt)}
        </Normaltekst>
    );
}

export default UtbetalingerOversikt;
