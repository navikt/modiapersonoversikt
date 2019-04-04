import * as React from 'react';
import styled from 'styled-components';

import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Foreldrepengerettighet, ForeldrepengerResponse } from '../../../models/ytelse/foreldrepenger';
import FillCenterAndFadeIn from '../../FillCenterAndFadeIn';
import Foreldrepenger from '../../../app/personside/infotabs/ytelser/foreldrepenger/ForeldrePenger';
import { FlexCenter } from '../../common-styled-components';
import theme from '../../../styles/personOversiktTheme';
import RestResourceConsumerTyped from '../../../restResources/consumer/RestResourceConsumerTyped';

interface Props {
    fødselsnummer: string;
}

const Margin = styled.div`
    margin: 0.5em;
`;

const Style = styled.div`
    ${theme.hvittPanel};
    max-width: ${theme.width.ytelser};
`;

const onPending = (
    <FillCenterAndFadeIn>
        <Margin>
            <NavFrontendSpinner type={'XL'} />
        </Margin>
    </FillCenterAndFadeIn>
);

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved lasting av Foreldrepenger.</AlertStripe>
    </FillCenterAndFadeIn>
);

class ForeldrepengerLaster extends React.PureComponent<Props> {
    getAktuellForeldrepengeRettighet(ForeldrepengeRettighet: Foreldrepengerettighet[] | null) {
        if (!ForeldrepengeRettighet) {
            return <AlertStripeInfo>Kunne ikke finne noen Foreldrepengerettigheter for bruker</AlertStripeInfo>;
        }

        const aktuellRettighet = ForeldrepengeRettighet.find(
            rettighet => rettighet.forelder === this.props.fødselsnummer
        );

        if (!aktuellRettighet) {
            return <AlertStripeInfo>Kunne ikke finne Foreldrepengerettighet</AlertStripeInfo>;
        }

        return (
            <FlexCenter>
                <Style>
                    <Foreldrepenger foreldrepenger={aktuellRettighet} />
                </Style>
            </FlexCenter>
        );
    }

    render() {
        return (
            <RestResourceConsumerTyped<ForeldrepengerResponse>
                getRestResource={restResources => restResources.foreldrepenger}
                returnOnPending={onPending}
                returnOnError={onError}
            >
                {data => this.getAktuellForeldrepengeRettighet(data.foreldrepenger)}
            </RestResourceConsumerTyped>
        );
    }
}

export default ForeldrepengerLaster;
