import * as React from 'react';
import styled from 'styled-components';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Pleiepengerettighet, PleiepengerResponse } from '../../../models/ytelse/pleiepenger';
import FillCenterAndFadeIn from '../../FillCenterAndFadeIn';
import Pleiepenger from '../../../app/personside/infotabs/ytelser/pleiepenger/Pleiepenger';
import { FlexCenter } from '../../common-styled-components';
import theme from '../../../styles/personOversiktTheme';
import RestResourceConsumer from '../../../rest/consumer/RestResourceConsumer';
import { BigCenteredLazySpinner } from '../../BigCenteredLazySpinner';

interface Props {
    fødselsnummer: string;
    barnetsFødselsnummer: string;
}

const Style = styled.div`
    ${theme.hvittPanel};
`;

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
            <FlexCenter>
                <Style>
                    <Pleiepenger pleiepenger={aktuellRettighet} />
                </Style>
            </FlexCenter>
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
