import * as React from 'react';
import { useEffect } from 'react';
import { SykepengerResponse } from '../../../models/ytelse/sykepenger';
import { loggError, loggEvent } from '../../../utils/logger/frontendLogger';
import Sykepenger from '../../../app/personside/infotabs/ytelser/sykepenger/Sykepenger';
import moment from 'moment';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import RestResourceConsumer from '../../../rest/consumer/RestResourceConsumer';
import { BigCenteredLazySpinner } from '../../BigCenteredLazySpinner';
import Panel from 'nav-frontend-paneler';

interface OwnProps {
    fnr: string;
    sykmeldtFraOgMed: string;
}

type Props = OwnProps;

function SykePengerLaster(props: Props) {
    useEffect(() => {
        loggEvent('Sidevisning', 'Sykepenger');
    }, []);

    function getInnhold(data: SykepengerResponse) {
        if (!data.sykepenger) {
            return <AlertStripeInfo>Kunne ikke finne sykepengerettighet for bruker</AlertStripeInfo>;
        }
        const aktuellRettighet = data.sykepenger.find(rettighet =>
            moment(rettighet.sykmeldtFom).isSame(moment(props.sykmeldtFraOgMed))
        );
        if (!aktuellRettighet) {
            loggError(new Error('Kunne ikke finne sykepengerettighet'), undefined, {
                fnr: props.fnr,
                sykmeldtFraOgMed: props.sykmeldtFraOgMed
            });
            return <AlertStripeAdvarsel>Fant ikke aktuell sykepengerettighet for bruker</AlertStripeAdvarsel>;
        }
        return (
            <Panel>
                <Sykepenger sykepenger={aktuellRettighet} />
            </Panel>
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
