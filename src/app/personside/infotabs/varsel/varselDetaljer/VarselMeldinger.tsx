import styled from 'styled-components';
import type { Varselmelding } from '../../../../../models/varsel';
import theme from '../../../../../styles/personOversiktTheme';
import { useOnMount } from '../../../../../utils/customHooks';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import VarselMelding from './VarselMelding';

interface Props {
    sortertMeldingsliste: Varselmelding[];
}

const ListeStyle = styled.ol`
    ${theme.graattPanel}
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

function VarselMeldinger(props: Props) {
    useOnMount(() => {
        loggEvent('VisVarselDetaljer', 'Varsler');
    });

    const listekomponenter = props.sortertMeldingsliste.map((melding, index) => (
        <VarselMelding key={index} melding={melding} />
    ));

    return <ListeStyle aria-label="Meldinger">{listekomponenter}</ListeStyle>;
}

export default VarselMeldinger;
