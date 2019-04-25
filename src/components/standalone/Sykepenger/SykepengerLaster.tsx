import * as React from 'react';
import { useEffect } from 'react';
import { SykepengerResponse } from '../../../models/ytelse/sykepenger';
import { loggError, loggEvent } from '../../../utils/frontendLogger';
import Sykepenger from '../../../app/personside/infotabs/ytelser/sykepenger/Sykepenger';
import moment from 'moment';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import RestResourceConsumer from '../../../rest/consumer/RestResourceConsumer';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import { FlexCenter } from '../../common-styled-components';
import { BigCenteredLazySpinner } from '../../BigCenteredLazySpinner';

interface OwnProps {
    fødselsnummer: string;
    sykmeldtFraOgMed: string;
}

const Style = styled.div`
    ${theme.hvittPanel};
    max-width: ${theme.width.ytelser};
`;

type Props = OwnProps;

function SykePengerLaster(props: Props) {
    useEffect(() => {
        loggEvent('Sidevisning', 'Sykepenger');
    }, []);

    function getInnhold(data: SykepengerResponse) {
        if (!data.sykepenger) {
            return <AlertStripeAdvarsel>Kunne ikke finne sykepengerettighet for bruker</AlertStripeAdvarsel>;
        }
        const aktuellRettighet = data.sykepenger.find(rettighet =>
            moment(rettighet.sykmeldtFom).isSame(moment(props.sykmeldtFraOgMed))
        );
        if (!aktuellRettighet) {
            loggError(new Error('Kunne ikke finne sykepengerettighet'), undefined, {
                fnr: props.fødselsnummer,
                sykmeldtFraOgMed: props.sykmeldtFraOgMed
            });
            return <AlertStripeAdvarsel>Fant ikke aktuell sykepengerettighet for bruker</AlertStripeAdvarsel>;
        }
        return (
            <FlexCenter>
                <Style>
                    <Sykepenger sykepenger={aktuellRettighet} />
                </Style>
            </FlexCenter>
        );
    }

    return (
        <RestResourceConsumer<SykepengerResponse>
            returnOnPending={BigCenteredLazySpinner}
            getResource={restResources => restResources.sykepenger}
        >
            {data => getInnhold(data)}
        </RestResourceConsumer>
    );
}

export default SykePengerLaster;
