import * as React from 'react';
import { Varselmelding } from '../../../../../models/varsel';
import styled from 'styled-components/macro';
import theme from '../../../../../styles/personOversiktTheme';
import VarselMelding from './VarselMelding';

interface Props {
    sortertMeldingsliste: Varselmelding[];
}

const ListeStyle = styled.ol`
    ${theme.gråttPanel}
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

function VarselMeldinger(props: Props) {
    const listekomponenter = props.sortertMeldingsliste.map((melding, index) => (
        <VarselMelding key={index} melding={melding} />
    ));

    return <ListeStyle aria-label="Meldinger">{listekomponenter}</ListeStyle>;
}

export default VarselMeldinger;
