import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import type { ReactNode } from 'react';
import type { Sakstema } from 'src/generated/modiapersonoversikt-api';
import { trackingEvents } from 'src/utils/analytics';
import styled from 'styled-components';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import theme from '../../../../styles/personOversiktTheme';
import { useOnMount } from '../../../../utils/customHooks';
import SakstemaListeElementKnappV2 from '../saksoversikt/sakstemaliste/SakstemaListeElementKnappV2';
import { useHentAlleSakstemaFraResourceV2 } from '../saksoversikt/useSakstemaURLState';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

function SakerOversikt(props: Props) {
    const { alleSakstema, isLoading } = useHentAlleSakstemaFraResourceV2();

    if (isLoading) {
        return <CenteredLazySpinner padding={theme.margin.layout} />;
    }

    return <SakerPanel sakstema={alleSakstema} {...props} />;
}

function SakerPanel(props: { sakstema: Sakstema[] } & Props) {
    const sakstemakomponenter = props.sakstema.slice(0, 2).map((sakstema, index) => (
        <SakstemaListeElementKnappV2
            sakstema={sakstema}
            umamiEvent={{ name: trackingEvents.detaljvisningKlikket, data: { fane: 'oversikt', tekst: 'vis sak' } }}
            key={index}
            erValgt={false}
        />
    ));

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
