import * as React from 'react';
import { Varselmelding } from '../../../../../models/varsel';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import VarselDetaljerElement from './VarselDetaljerElement';

interface Props {
    sortertMeldingsliste: Varselmelding[];
}

const ListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;

function VarselDetaljer(props: Props) {
    const listekomponenter = props.sortertMeldingsliste.map((melding, index) => (
        <VarselDetaljerElement key={index} melding={melding} />
    ));

    return <ListeStyle>{listekomponenter}</ListeStyle>;
}

export default VarselDetaljer;
