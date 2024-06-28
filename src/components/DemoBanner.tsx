import * as React from 'react';
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

const isDemo = import.meta.env.VITE_MOCK_ENABLED === 'true';
function DemoBanner() {
    if (!isDemo) {
        return null;
    }

    return (
        <DemoStyle>
            <Systemtittel tag="p">Demo</Systemtittel>
            <Normaltekst>Syntetisk informasjon</Normaltekst>
        </DemoStyle>
    );
}

export default DemoBanner;
