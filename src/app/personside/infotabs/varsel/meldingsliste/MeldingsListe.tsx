import * as React from 'react';
import { Varselmelding } from '../../../../../models/varsel';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import MeldingsListeElement from './MeldingsListeElement';

interface Props {
    sortertMeldingsliste: Varselmelding[];
}

const ListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;

function MeldingsListe(props: Props) {
    const listekomponenter = props.sortertMeldingsliste.map((melding, index) => (
        <MeldingsListeElement key={index} melding={melding} />
    ));

    return <ListeStyle>{listekomponenter}</ListeStyle>;
}

export default MeldingsListe;
