import * as React from 'react';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Pleiepengerettighet, PleiepengerResponse } from '../../../models/ytelse/pleiepenger';
import FillCenterAndFadeIn from '../../FillCenterAndFadeIn';
import Pleiepenger from '../../../app/personside/infotabs/ytelser/pleiepenger/Pleiepenger';
import RestResourceConsumer from '../../../rest/consumer/RestResourceConsumer';
import { BigCenteredLazySpinner } from '../../BigCenteredLazySpinner';
import Panel from 'nav-frontend-paneler';

interface Props {
    fødselsnummer: string;
    barnetsFødselsnummer: string;
}

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved lasting av pleiepenger.</AlertStripe>
    </FillCenterAndFadeIn>
);

class PleiepengerLaster extends React.PureComponent<Props> {
    getAktuellPleiepengeRettighet(pleiepengeRettighet: Pleiepengerettighet[] | null) {
        if (!pleiepengeRettighet) {
            return <AlertStripeInfo>Kunne ikke finne noen pleiepengerettigheter for bruker</AlertStripeInfo>;
        }

        const aktuellRettighet = pleiepengeRettighet.find(
            rettighet => rettighet.barnet === this.props.barnetsFødselsnummer
        );

        if (!aktuellRettighet) {
            return <AlertStripeInfo>Kunne ikke finne pleiepengerettighet for barnet</AlertStripeInfo>;
        }

        return (
            <Panel>
                <Pleiepenger pleiepenger={aktuellRettighet} />
            </Panel>
        );
    }

    render() {
        return (
            <RestResourceConsumer<PleiepengerResponse>
                getResource={restResources => restResources.pleiepenger}
                returnOnPending={BigCenteredLazySpinner}
                returnOnError={onError}
            >
                {data => this.getAktuellPleiepengeRettighet(data.pleiepenger)}
            </RestResourceConsumer>
        );
    }
}

export default PleiepengerLaster;
