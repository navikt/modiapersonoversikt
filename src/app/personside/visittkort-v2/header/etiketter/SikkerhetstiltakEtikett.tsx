import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import theme from '../../../../../styles/personOversiktTheme';
import styled, { keyframes } from 'styled-components/macro';
import { useFocusOnMount } from '../../../../../utils/customHooks';
import { Sikkerhetstiltak } from '../../PersondataDomain';

const bump = keyframes`
  to { transform: scale(1.1); }
`;

const Styling = styled.div`
    display: inline-block;
    animation: ${bump} 0.3s 1s 6 alternate;
    &:focus {
        ${theme.focus}
    }
`;

interface Props {
    sikkerhetstiltak: Sikkerhetstiltak[];
}

function erAktivSikkerhetstiltak(sikkerhetstiltak: Sikkerhetstiltak[]) {
    for (const tiltak of sikkerhetstiltak) {
        const gyldigTilOgMedTid = new Date(tiltak.gyldigTilOgMed).getTime();
        const gyldigFraOgMedTid = new Date(tiltak.gyldigFraOgMed).getTime();
        const naverendeTidspunkt = Date.now();
        if (gyldigFraOgMedTid <= naverendeTidspunkt && gyldigTilOgMedTid >= naverendeTidspunkt) {
            return true;
        }
    }
    return false;
}

function SikkerhetstiltakEtikett({ sikkerhetstiltak }: Props) {
    const etikettRef = React.createRef<HTMLDivElement>();
    useFocusOnMount(etikettRef);

    // TODO: Vil denne lista bli oppdatert (fjerne gamle tiltak)
    if (sikkerhetstiltak.length === 0) {
        return null;
    }

    if (erAktivSikkerhetstiltak(sikkerhetstiltak)) {
        return (
            <Styling tabIndex={-1} ref={etikettRef} role="alert" aria-live="assertive">
                <EtikettBase type={'advarsel'}>Sikkerhetstiltak</EtikettBase>
            </Styling>
        );
    }
    return null;
}

export default SikkerhetstiltakEtikett;
