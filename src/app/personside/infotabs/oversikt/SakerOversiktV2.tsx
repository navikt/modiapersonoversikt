import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import type { SakstemaSoknadsstatus } from '../../../../models/saksoversikt/sakstema';
import resource from '../../../../rest/resources/sakstemaResource';
import theme from '../../../../styles/personOversiktTheme';
import { useOnMount } from '../../../../utils/customHooks';
import SakstemaListeElementKnappV2 from '../saksoversikt/sakstemaliste/SakstemaListeElementKnappV2';
import { filtrerSakstemaerUtenDataV2 } from '../saksoversikt/sakstemaliste/SakstemaListeUtils';

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
