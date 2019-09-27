import * as React from 'react';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import SakstemaListeElement from '../saksoversikt/sakstemaliste/SakstemaListeElement';
import { withRouter } from 'react-router';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    sakstema: Sakstema[];
}

function SakerOversikt() {
    return (
        <RestResourceConsumer<SakstemaResponse>
            getResource={restResources => restResources.sakstema}
            returnOnPending={<CenteredLazySpinner padding={theme.margin.layout} />}
        >
            {data => <SakerPanel sakstema={data.resultat} />}
        </RestResourceConsumer>
    );
}

function SakerPanel(props: Props) {
    const sakstemakomponenter = props.sakstema
        .filter(sakstema => sakstema.behandlingskjeder.length > 0 || sakstema.dokumentMetadata.length > 0)
        .slice(0, 2)
        .map((sakstema, index) => <SakstemaListeElement sakstema={sakstema} key={index} erValgt={false} />);

    if (sakstemakomponenter.length === 0) {
        return <AlertStripeInfo>Fant ingen saker på bruker</AlertStripeInfo>;
    }

    return <ListStyle>{sakstemakomponenter}</ListStyle>;
}

export default withRouter(SakerOversikt);
