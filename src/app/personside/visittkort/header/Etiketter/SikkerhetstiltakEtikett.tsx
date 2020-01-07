import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import theme from '../../../../../styles/personOversiktTheme';
import styled, { keyframes } from 'styled-components/macro';
import { useFocusOnMount } from '../../../../../utils/customHooks';
import { Sikkerhetstiltak } from '../../../../../models/sikkerhetstiltak';

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

function SikkerhetstiltakEtikett(props: { sikkerhetstiltak?: Sikkerhetstiltak }) {
    const etikettRef = React.createRef<HTMLDivElement>();
    useFocusOnMount(etikettRef);

    if (!props.sikkerhetstiltak) {
        return null;
    }

    return (
        <Styling tabIndex={-1} ref={etikettRef} role="alert" aria-live="assertive">
            <EtikettBase type={'advarsel'}>Sikkerhetstiltak</EtikettBase>
        </Styling>
    );
}

export default SikkerhetstiltakEtikett;
