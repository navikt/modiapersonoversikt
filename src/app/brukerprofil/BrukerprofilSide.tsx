import * as React from 'react';
import styled from 'styled-components/macro';
import { loggEvent } from '../../utils/frontendLogger';
import { useOnMount } from '../../utils/customHooks';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import useUrlNyPersonforvalter from './useUrlNyPersonforvalter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';

export const NyBrukerprofilStyling = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    > *:first-child {
        margin-bottom: 1rem;
    }
`;

function BrukerprofilSide() {
    useOnMount(() => loggEvent('Sidevisning', 'Brukerprofil'));
    const urlNyPersonForvalter = useUrlNyPersonforvalter();

    return (
        <NyBrukerprofilStyling>
            <AlertStripeInfo>Redigering av brukerprofil er flyttet</AlertStripeInfo>
            <LenkepanelBase href={urlNyPersonForvalter}>Gå til den nye personforvalteren</LenkepanelBase>
        </NyBrukerprofilStyling>
    );
}

export default BrukerprofilSide;
