import * as React from 'react';
import { Varsel as VarselModell } from '../../../../models/varsel';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { datoSynkende } from '../../../../utils/dateUtils';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import Varsel from '../varsel/Varsel';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
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

function VarselOversikt(props: Props) {
    return (
        <RestResourceConsumer<VarselModell[]>
            getResource={restResources => restResources.brukersVarsler}
            returnOnPending={<CenteredLazySpinner padding={theme.margin.layout} />}
        >
            {data => <VarselVisning varsler={data} {...props} />}
        </RestResourceConsumer>
    );
}

function VarselVisning(props: { varsler: VarselModell[] } & Props) {
    const sortertPåDato = props.varsler.sort(datoSynkende(varsel => varsel.mottattTidspunkt)).slice(0, 2);

    useOnMount(() => {
        props.setHeaderContent(
            <Normaltekst>
                {sortertPåDato.length} / {props.varsler.length}
            </Normaltekst>
        );
    });

    if (props.varsler.length === 0) {
        return <AlertStripeInfo>Ingen varsler på bruker</AlertStripeInfo>;
    }

    return (
        <ListStyle>
            {sortertPåDato.map((varsel, index) => (
                <Varsel key={index} varsel={varsel} />
            ))}
        </ListStyle>
    );
}

export default VarselOversikt;
