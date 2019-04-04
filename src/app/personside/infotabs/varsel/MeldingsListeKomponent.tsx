import * as React from 'react';
import { Varselmelding } from '../../../../models/varsel';
import { datoSynkende } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Meldingskomponent from './Meldingskomponent';

interface Props {
    meldingsliste: Varselmelding[];
}

const ListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;

function MeldingsListeKomponent(props: Props) {
    const sorterPåDato = props.meldingsliste.sort(datoSynkende(melding => melding.utsendingsTidspunkt));

    const listekomponenter = sorterPåDato.map(melding => <Meldingskomponent melding={melding} />);

    return <ListeStyle>{listekomponenter}</ListeStyle>;
}

export default MeldingsListeKomponent;
