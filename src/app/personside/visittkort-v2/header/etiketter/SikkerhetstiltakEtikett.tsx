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

function SikkerhetstiltakEtikett({ sikkerhetstiltak }: Props) {
    const etikettRef = React.createRef<HTMLDivElement>();
    useFocusOnMount(etikettRef);

    if (sikkerhetstiltak.isEmpty()) {
        return null;
    }

    return (
        <Styling tabIndex={-1} ref={etikettRef} role="alert" aria-live="assertive">
            <EtikettBase type={'advarsel'}>Sikkerhetstiltak</EtikettBase>
        </Styling>
    );
}

export default SikkerhetstiltakEtikett;
