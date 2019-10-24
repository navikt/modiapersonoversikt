import * as React from 'react';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../styles/personOversiktTheme';
import EtikettGrå from '../../../components/EtikettGrå';
import { formatterDatoTid } from '../../../utils/dateUtils';
import Tekstomrade from 'nav-frontend-tekstomrade';

const PreviewStyle = styled.article`
    padding: 1rem;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: ${theme.borderRadius.layout};
    > * {
        margin-bottom: 0.5rem;
    }
    overflow-wrap: break-word;
`;

interface Props {
    tittel: string;
    fritekst: string;
}

function Preview(props: Props) {
    return (
        <PreviewStyle>
            <Normaltekst>{props.tittel}</Normaltekst>
            <EtikettGrå>{formatterDatoTid(new Date())}</EtikettGrå>
            <Tekstomrade>{props.fritekst}</Tekstomrade>
        </PreviewStyle>
    );
}

export default Preview;
