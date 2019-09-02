import * as React from 'react';
import { Varsel as VarselModell } from '../../../../models/varsel';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { datoSynkende } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Varsel from '../varsel/Varsel';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    varsler: VarselModell[];
}

function VarselOversikt() {
    return (
        <RestResourceConsumer<VarselModell[]>
            getResource={restResources => restResources.brukersVarsler}
            returnOnPending={<CenteredLazySpinner padding={theme.margin.layout} />}
        >
            {data => <VarselVisning varsler={data} />}
        </RestResourceConsumer>
    );
}

function VarselVisning(props: Props) {
    if (props.varsler.length === 0) {
        return <AlertStripeInfo>Ingen varsler på bruker</AlertStripeInfo>;
    }

    const sortertPåDato = props.varsler.sort(datoSynkende(varsel => varsel.mottattTidspunkt)).slice(0, 2);

    return (
        <ListStyle>
            {sortertPåDato.map((varsel, index) => (
                <Varsel key={index} varsel={varsel} />
            ))}
        </ListStyle>
    );
}

export default VarselOversikt;
