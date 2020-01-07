import * as React from 'react';
import { mockEnabled } from '../api/config';
import styled from 'styled-components/macro';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

const DemoStyle = styled.div`
    position: fixed;
    transform: translate(-28%, 40%) rotate(-35deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    background-color: red;
    color: white;
    width: 20rem;
    opacity: 0.5;
    filter: drop-shadow(0 1rem 1rem #0008);
    z-index: 1000;
    pointer-events: none;
`;

function DemoBanner() {
    if (!mockEnabled) {
        return null;
    }

    return (
        <DemoStyle>
            <Systemtittel>Demo</Systemtittel>
            <Normaltekst>Syntetisk informasjon</Normaltekst>
        </DemoStyle>
    );
}

export default DemoBanner;
