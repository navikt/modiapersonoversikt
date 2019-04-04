import * as React from 'react';
import { Varselmelding } from '../../../../../models/varsel';
import { datoSynkende } from '../../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import MeldingsListeElement from './MeldingsListeElement';

interface Props {
    meldingsliste: Varselmelding[];
}

const ListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;

function MeldingsListe(props: Props) {
    const sorterPåDato = props.meldingsliste.sort(datoSynkende(melding => melding.utsendingsTidspunkt));

    const listekomponenter = sorterPåDato.map((melding, index) => (
        <MeldingsListeElement key={index} melding={melding} />
    ));

    return <ListeStyle>{listekomponenter}</ListeStyle>;
}

export default MeldingsListe;
