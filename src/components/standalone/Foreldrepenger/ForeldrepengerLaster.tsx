import * as React from 'react';
import styled from 'styled-components';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Foreldrepengerettighet, ForeldrepengerResponse } from '../../../models/ytelse/foreldrepenger';
import FillCenterAndFadeIn from '../../FillCenterAndFadeIn';
import Foreldrepenger from '../../../app/personside/infotabs/ytelser/foreldrepenger/ForeldrePenger';
import { FlexCenter } from '../../common-styled-components';
import theme from '../../../styles/personOversiktTheme';
import RestResourceConsumer from '../../../rest/consumer/RestResourceConsumer';
import { BigCenteredLazySpinner } from '../../BigCenteredLazySpinner';

interface Props {
    fødselsnummer: string;
}

const Style = styled.div`
    ${theme.hvittPanel};
    max-width: ${theme.width.ytelser};
`;

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
            <RestResourceConsumer<ForeldrepengerResponse>
                getResource={restResources => restResources.foreldrepenger}
                returnOnPending={BigCenteredLazySpinner}
                returnOnError={onError}
            >
                {data => this.getAktuellForeldrepengeRettighet(data.foreldrepenger)}
            </RestResourceConsumer>
        );
    }
}

export default ForeldrepengerLaster;
