import * as React from 'react';
import { useEffect } from 'react';
import { SykepengerResponse } from '../../../models/ytelse/sykepenger';
import { loggError, loggEvent } from '../../../utils/frontendLogger';
import Sykepenger from '../../../app/personside/infotabs/ytelser/sykepenger/Sykepenger';
import moment from 'moment';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import RestResourceConsumer from '../../../rest/consumer/RestResourceConsumer';

interface OwnProps {
    fødselsnummer: string;
    sykmeldtFraOgMed: string;
}

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
            return <AlertStripeAdvarsel>Fant ikke riktig sykepengerettighet for bruker</AlertStripeAdvarsel>;
        }
        return (
            <ol>
                <Sykepenger sykepenger={aktuellRettighet} />
            </ol>
        );
    }

    return (
        <RestResourceConsumer<SykepengerResponse>
            spinnerSize="XL"
            getRestResource={restResources => restResources.sykepenger}
        >
            {data => getInnhold(data)}
        </RestResourceConsumer>
    );
}

export default SykePengerLaster;
