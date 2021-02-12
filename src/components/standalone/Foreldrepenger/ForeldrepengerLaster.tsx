import * as React from 'react';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Foreldrepengerettighet, ForeldrepengerResponse } from '../../../models/ytelse/foreldrepenger';
import FillCenterAndFadeIn from '../../FillCenterAndFadeIn';
import Foreldrepenger from '../../../app/personside/infotabs/ytelser/foreldrepenger/ForeldrePenger';
import RestResourceConsumer from '../../../rest/consumer/RestResourceConsumer';
import { BigCenteredLazySpinner } from '../../BigCenteredLazySpinner';
import Panel from 'nav-frontend-paneler';
import styled from 'styled-components/macro';

const StyledPanel = styled(Panel)`
    padding: 0rem;
`;
interface Props {
    fnr: string;
}
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

        const aktuellRettighet = ForeldrepengeRettighet.find(rettighet => rettighet.forelder === this.props.fnr);

        if (!aktuellRettighet) {
            return <AlertStripeInfo>Kunne ikke finne Foreldrepengerettighet</AlertStripeInfo>;
        }

        return (
            <StyledPanel>
                <Foreldrepenger foreldrepenger={aktuellRettighet} />
            </StyledPanel>
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
