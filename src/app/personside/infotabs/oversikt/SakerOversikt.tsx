import * as React from 'react';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import SakstemaListeElementKnapp from '../saksoversikt/sakstemaliste/SakstemaListeElementKnapp';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { ReactNode } from 'react';
import { useOnMount } from '../../../../utils/customHooks';
import { Normaltekst } from 'nav-frontend-typografi';
import { filtrerSakstemaerUtenData } from '../saksoversikt/sakstemaliste/SakstemaListeUtils';
import sakstemaResource from '../../../../rest/resources/sakstemaResource';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

function SakerOversikt(props: Props) {
    return sakstemaResource.useRenderer({
        ifPending: <CenteredLazySpinner padding={theme.margin.layout} />,
        ifData: (sakstema) => <SakerPanel sakstema={sakstema.resultat} {...props} />
    });
}

function SakerPanel(props: { sakstema: Sakstema[] } & Props) {
    const sakstemakomponenter = filtrerSakstemaerUtenData(props.sakstema)
        .slice(0, 2)
        .map((sakstema, index) => <SakstemaListeElementKnapp sakstema={sakstema} key={index} erValgt={false} />);

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
