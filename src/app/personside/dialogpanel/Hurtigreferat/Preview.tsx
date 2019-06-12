import * as React from 'react';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import EtikettGrå from '../../../../components/EtikettGrå';
import { formatterDatoTid } from '../../../../utils/dateUtils';
import { SendMeldingRequest } from '../../../../models/meldinger/meldinger';
import theme from '../../../../styles/personOversiktTheme';

const PreviewStyle = styled.article`
    padding: 1rem;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: ${theme.borderRadius.layout};
    > * {
        margin-bottom: 0.5rem;
    }
`;

function Preview(props: Partial<SendMeldingRequest>) {
    return (
        <PreviewStyle>
            <Normaltekst>Samtalereferat / Telefon</Normaltekst>
            <EtikettGrå>{formatterDatoTid(new Date())}</EtikettGrå>
            <Normaltekst>{props.fritekst}</Normaltekst>
        </PreviewStyle>
    );
}

export default Preview;
