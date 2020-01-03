import * as React from 'react';
import styled from 'styled-components/macro';
import { Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../styles/personOversiktTheme';
import EtikettGrå from '../../../components/EtikettGrå';
import { formatterDatoTid } from '../../../utils/dateUtils';
import Tekstomrade from 'nav-frontend-tekstomrade';
import NavFrontendSpinner from 'nav-frontend-spinner';

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
    opprettetDato?: string;
}

function Preview(props: Props) {
    const opprettetDato = props.opprettetDato ? (
        <EtikettGrå>{formatterDatoTid(props.opprettetDato)}</EtikettGrå>
    ) : (
        <NavFrontendSpinner type="XXS" />
    );

    return (
        <PreviewStyle>
            <Normaltekst>{props.tittel}</Normaltekst>
            {opprettetDato}
            <Tekstomrade>{props.fritekst}</Tekstomrade>
        </PreviewStyle>
    );
}

export default Preview;
