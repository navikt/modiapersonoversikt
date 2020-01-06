import * as React from 'react';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import SakstemaListeElement from '../saksoversikt/sakstemaliste/SakstemaListeElement';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { ReactNode } from 'react';
import { useOnMount } from '../../../../utils/customHooks';
import { Normaltekst } from 'nav-frontend-typografi';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

function SakerOversikt(props: Props) {
    return (
        <RestResourceConsumer<SakstemaResponse>
            getResource={restResources => restResources.sakstema}
            returnOnPending={<CenteredLazySpinner padding={theme.margin.layout} />}
        >
            {data => <SakerPanel sakstema={data.resultat} {...props} />}
        </RestResourceConsumer>
    );
}

function SakerPanel(props: { sakstema: Sakstema[] } & Props) {
    const sakstemakomponenter = props.sakstema
        .filter(sakstema => sakstema.behandlingskjeder.length > 0 || sakstema.dokumentMetadata.length > 0)
        .slice(0, 2)
        .map((sakstema, index) => <SakstemaListeElement sakstema={sakstema} key={index} erValgt={false} />);

    useOnMount(() => {
        props.setHeaderContent(
            <Normaltekst>
                {sakstemakomponenter.length} / {props.sakstema.length}
            </Normaltekst>
        );
    });

    if (sakstemakomponenter.length === 0) {
        return <AlertStripeInfo>Fant ingen saker på bruker</AlertStripeInfo>;
    }

    return <ListStyle>{sakstemakomponenter}</ListStyle>;
}

export default SakerOversikt;
