import * as React from 'react';
import { Tekst, tekster } from './tekster';
import HurtigvelgerElement from './HurtigvelgerElement';
import styled from 'styled-components';

interface Props {
    send: (tekst: Tekst) => void;
}

const MarginBottom = styled.div`
    margin-bottom: 6rem;
`;

function HurtigvalgListe(props: Props) {
    return (
        <ul>
            {tekster.map(tekst => (
                <HurtigvelgerElement key={tekst.tittel} tekst={tekst} sendTekst={() => props.send(tekst)} />
            ))}
            <MarginBottom />
        </ul>
    );
}

export default HurtigvalgListe;
