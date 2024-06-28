import * as React from 'react';
import { SakstemaSoknadsstatus } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { ReactNode } from 'react';
import { useOnMount } from '../../../../utils/customHooks';
import { Normaltekst } from 'nav-frontend-typografi';
import { filtrerSakstemaerUtenDataV2 } from '../saksoversikt/sakstemaliste/SakstemaListeUtils';
import resource from '../../../../rest/resources/sakstemaResource';
import SakstemaListeElementKnappV2 from '../saksoversikt/sakstemaliste/SakstemaListeElementKnappV2';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

function SakerOversikt(props: Props) {
    return resource.useRenderer({
        ifPending: <CenteredLazySpinner padding={theme.margin.layout} />,
        ifData: (sakstema) => <SakerPanel sakstema={sakstema.resultat} {...props} />
    });
}

function SakerPanel(props: { sakstema: SakstemaSoknadsstatus[] } & Props) {
    const sakstemakomponenter = filtrerSakstemaerUtenDataV2(props.sakstema)
        .slice(0, 2)
        .map((sakstema, index) => <SakstemaListeElementKnappV2 sakstema={sakstema} key={index} erValgt={false} />);

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
